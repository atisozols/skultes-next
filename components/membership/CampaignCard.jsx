'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa6';
import { campaignProgress } from '@/lib/challenges/progress';

// "+3 dienas" / "+1 diena" (nominative)
const daysNom = (n) => `${n} ${n === 1 ? 'diena' : 'dienas'}`;

// Message driven by how many bonus tiers the member has cleared this month
// (tiers are 8/12/16 → visit ranges 0-7, 8-11, 12-15, 16+).
function campaignMessage(p) {
  const cleared = p.tiersCleared.length;
  if (cleared >= p.tiers.length) return 'Visi mēneša bonusi sasniegti!';
  if (cleared >= 2) return 'Vēl tikai nedaudz līdz pēdējam bonusam!';
  if (cleared >= 1) return 'Pirmais bonuss sasniegts - turpini un saņem papildus dienas šomēnes!';
  return 'Apmeklē klubu šomēnes un trenējies papildus dienas bez maksas!';
}

// Node positions (percent of full width). Symmetric breathing room on both
// ends: the first node is inset so there's room to show progress toward the
// first bonus (0 → first tier), and the last node is inset by the same margin
// so it isn't jammed against the right edge (its label can centre under it).
const NODE_MARGIN = 10;
const nodePos = (i, n) => NODE_MARGIN + (i / (n - 1)) * (100 - 2 * NODE_MARGIN); // 10/50/90 for n=3

// Percent (0..100) the accent fill should reach: 0 visits → 0% (bar start),
// each tier's visit count → its node position, interpolated between.
function fillPercent(counted, tiers) {
  const n = tiers.length;
  const vx = [0, ...tiers.map((t) => t.visitsRequired)];
  const px = [0, ...tiers.map((_, i) => nodePos(i, n))];
  if (counted >= vx[vx.length - 1]) return px[px.length - 1];
  for (let i = 1; i < vx.length; i++) {
    if (counted < vx[i]) {
      const frac = (counted - vx[i - 1]) / (vx[i] - vx[i - 1]);
      return px[i - 1] + frac * (px[i] - px[i - 1]);
    }
  }
  return 0;
}

const CampaignCard = ({ campaign, visitHistory }) => {
  const shouldReduce = useReducedMotion();
  const p = campaignProgress(visitHistory, campaign);
  if (!p) return null;

  const n = p.tiers.length;
  const fill = fillPercent(p.countedVisits, p.tiers);
  const trackEnd = nodePos(n - 1, n); // last node position; track stops here

  // Per-tier display state, computed once and shared by the node + label rows.
  const tierState = p.tiers.map((t) => ({
    t,
    cleared: p.countedVisits >= t.visitsRequired,
  }));

  return (
    <div className="flex flex-col gap-8">
      <p className="text-base font-medium leading-snug text-foreground">{campaignMessage(p)}</p>

      <div>
        {/* Node stepper — intro segment leads into the first node; the last node
            is inset from the right edge so its label can centre under it */}
        <div className="relative h-4">
          {/* track + fill run from the start to the last node */}
          <div
            className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/10"
            style={{ width: `${trackEnd}%` }}
          />
          <motion.div
            className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-accent"
            initial={shouldReduce ? false : { width: 0 }}
            animate={{ width: `${fill}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* nodes */}
          {tierState.map(({ t, cleared }, i) => (
            <div
              key={t.visitsRequired}
              className={`absolute top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 ${
                cleared ? 'border-accent bg-accent text-background' : 'border-white/20 bg-background'
              }`}
              style={{ left: `${nodePos(i, n)}%` }}
            >
              {cleared && <FaCheck className="text-[9px]" />}
            </div>
          ))}
        </div>

        {/* labels centred under each node */}
        <div className="relative mt-3 h-9">
          {tierState.map(({ t, cleared }, i) => (
            <div
              key={t.visitsRequired}
              className="absolute flex -translate-x-1/2 flex-col items-center gap-0.5 text-center"
              style={{ left: `${nodePos(i, n)}%` }}
            >
              <span
                className={`text-base font-bold leading-none ${cleared ? 'text-foreground' : 'text-alternate'}`}
              >
                {t.visitsRequired}
              </span>
              <span className={`text-xs leading-none ${cleared ? 'text-accent' : 'text-alternate'}`}>
                +{daysNom(t.daysToAward)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
