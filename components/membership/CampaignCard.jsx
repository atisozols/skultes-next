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

// Positions along the bar are PROPORTIONAL to visit count, not evenly spaced.
// The 0 → first-tier stretch is the longest (8 visits — a whole month for most
// members), so it fills the biggest share of the bar and every visit visibly
// advances it. Later tiers are fewer visits apart and take the smaller right
// portion. The last tier is inset from the right edge so its label can centre.
const RIGHT_MARGIN = 10;
const posForVisits = (v, maxVisits) =>
  (Math.min(v, maxVisits) / maxVisits) * (100 - RIGHT_MARGIN);

function fillPercent(counted, tiers) {
  return posForVisits(counted, tiers[tiers.length - 1].visitsRequired);
}

const CampaignCard = ({ campaign, visitHistory }) => {
  const shouldReduce = useReducedMotion();
  const p = campaignProgress(visitHistory, campaign);
  if (!p) return null;

  const maxVisits = p.tiers[p.tiers.length - 1].visitsRequired;
  const fill = fillPercent(p.countedVisits, p.tiers);
  const trackEnd = 100 - RIGHT_MARGIN; // last node position; track stops here

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
          {tierState.map(({ t, cleared }) => (
            <div
              key={t.visitsRequired}
              className={`absolute top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 ${
                cleared ? 'border-accent bg-accent text-background' : 'border-white/20 bg-background'
              }`}
              style={{ left: `${posForVisits(t.visitsRequired, maxVisits)}%` }}
            >
              {cleared && <FaCheck className="text-[9px]" />}
            </div>
          ))}
        </div>

        {/* labels centred under each node */}
        <div className="relative mt-3 h-9">
          {tierState.map(({ t, cleared }) => (
            <div
              key={t.visitsRequired}
              className="absolute flex -translate-x-1/2 flex-col items-center gap-0.5 whitespace-nowrap text-center"
              style={{ left: `${posForVisits(t.visitsRequired, maxVisits)}%` }}
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
