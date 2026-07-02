// Frontend campaign-progress derivation. DISPLAY ONLY — daysEarned here drives
// the progress UI and is NOT authoritative. The backend cron is the source of
// truth for actual membership extensions.

import { countVisitDaysInPeriod } from './counting';

export function campaignProgress(visitHistory, campaign) {
  if (!campaign) return null;

  const visitDays = (visitHistory || []).map((v) => v.date);
  const countedVisits = countVisitDaysInPeriod(visitDays, campaign.periodKey);

  const tiers = [...campaign.tiers].sort((a, b) => a.visitsRequired - b.visitsRequired);
  const tiersCleared = tiers.filter((t) => countedVisits >= t.visitsRequired);
  const daysEarned = tiersCleared.reduce((sum, t) => sum + t.daysToAward, 0);
  const nextTier = tiers.find((t) => countedVisits < t.visitsRequired) || null;
  const visitsToNext = nextTier ? nextTier.visitsRequired - countedVisits : null;

  return { countedVisits, tiers, tiersCleared, daysEarned, nextTier, visitsToNext };
}
