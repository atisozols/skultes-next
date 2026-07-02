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

// Piecewise-linear interpolation of the fill line: maps counted visits to a
// percent along the track so the fill reaches each node exactly when its tier
// is cleared, and grows smoothly between nodes.
function fillPercent(counted, tiers) {
  const n = tiers.length;
  const nodePct = (i) => ((i + 0.5) / n) * 100; // node centers: 16.7/50/83.3 for 3
  const vx = [0, ...tiers.map((t) => t.visitsRequired)];
  const px = [0, ...tiers.map((_, i) => nodePct(i))];
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

  const tiers = p.tiers;
  const trackEndPct = ((tiers.length - 0.5) / tiers.length) * 100; // last node center
  const fill = fillPercent(p.countedVisits, tiers);

  // Per-tier display state, computed once and shared by the node + label rows.
  const tierState = tiers.map((t) => ({
    t,
    cleared: p.countedVisits >= t.visitsRequired,
    isNext: p.nextTier?.visitsRequired === t.visitsRequired,
  }));

  return (
    <div className="flex flex-col gap-8">
      <p className="text-base font-medium leading-snug text-foreground">{campaignMessage(p)}</p>

      <div>
        {/* Node stepper */}
        <div className="relative" style={{ height: 28 }}>
          {/* track */}
          <div
            className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/10"
            style={{ left: 0, width: `${trackEndPct}%` }}
          />
          {/* fill */}
          <motion.div
            className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-accent"
            style={{ left: 0 }}
            initial={shouldReduce ? false : { width: 0 }}
            animate={{ width: `${fill}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* nodes */}
          <div className="absolute inset-0 flex">
            {tierState.map(({ t, cleared, isNext }) => (
              <div key={t.visitsRequired} className="flex flex-1 items-center justify-center">
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                    cleared
                      ? 'border-accent bg-accent text-background'
                      : isNext
                        ? 'border-white/20 bg-background'
                        : 'border-white/20 bg-background'
                  }`}
                >
                  {cleared && <FaCheck className="text-[11px]" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* labels under each node */}
        <div className="mt-3 flex">
          {tierState.map(({ t, cleared }) => (
            <div
              key={t.visitsRequired}
              className="flex flex-1 flex-col items-center gap-0.5 text-center"
            >
              <span
                className={`text-base font-bold leading-none ${cleared ? 'text-foreground' : 'text-alternate'}`}
              >
                {t.visitsRequired}
              </span>
              <span
                className={`text-xs leading-none ${cleared ? 'text-accent' : 'text-alternate'}`}
              >
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
