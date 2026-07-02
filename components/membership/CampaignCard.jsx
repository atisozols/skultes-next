'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa6';
import { campaignProgress } from '@/lib/challenges/progress';

// "+3 dienas" / "+1 diena" (nominative)
const daysNom = (n) => `${n} ${n === 1 ? 'diena' : 'dienas'}`;
// "par 3 dienām" / "par 1 dienu" (dative)
const daysDat = (n) => `${n} ${n === 1 ? 'dienu' : 'dienām'}`;
// "līdz +1 dienai" / "līdz +2 dienām"
const daysDatToward = (n) => `${n} ${n === 1 ? 'dienai' : 'dienām'}`;
// 1 apmeklējums / 9 apmeklējumi
const visitWord = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'apmeklējums' : 'apmeklējumi');

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
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-alternate">
          Šī mēneša progress
        </span>
        <span className="text-base font-semibold text-foreground">
          <span className="text-accent">{p.countedVisits}</span> {visitWord(p.countedVisits)} šomēnes
        </span>
        <p className="mt-1 text-sm text-alternate">
          Apmeklē klubu šomēnes un saņem papildus dienas bez maksas.
        </p>
      </div>

      {/* Node stepper */}
      <div className="mt-2">
        <div className="relative" style={{ height: 34 }}>
          {/* track */}
          <div
            className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-container"
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
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                    cleared
                      ? 'border-accent bg-accent text-background'
                      : isNext
                        ? 'border-accent bg-background'
                        : 'border-border bg-container'
                  }`}
                >
                  {cleared && <FaCheck className="text-[11px]" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* labels under each node */}
        <div className="mt-2 flex">
          {tierState.map(({ t, cleared, isNext }) => (
            <div key={t.visitsRequired} className="flex flex-1 flex-col items-center text-center">
              <span
                className={`text-sm font-semibold leading-tight ${cleared || isNext ? 'text-foreground' : 'text-alternate'}`}
              >
                {t.visitsRequired}
              </span>
              <span
                className={`text-[11px] leading-tight ${cleared ? 'text-accent' : 'text-alternate'}`}
              >
                +{daysNom(t.daysToAward)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer status */}
      <div className="flex flex-col gap-1 border-t border-border pt-4">
        {p.daysEarned > 0 && (
          <span className="text-sm font-semibold text-accent">
            Abonements pagarināts par {daysDat(p.daysEarned)}
          </span>
        )}
        {p.nextTier ? (
          <span className="text-sm text-alternate">
            Vēl {p.visitsToNext} {visitWord(p.visitsToNext)} līdz +{daysDatToward(p.nextTier.daysToAward)}
          </span>
        ) : (
          <span className="text-sm text-alternate">Visi mērķi sasniegti šomēnes</span>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
