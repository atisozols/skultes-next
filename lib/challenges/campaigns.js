// Campaign configs (frontend copy — display only). Must mirror the backend
// configs in skultesapi/challenges/campaigns/. The frontend uses these purely
// to render progress; the backend cron is the source of truth for awards.
//
// NOTE: metric.lockIds is documented for parity with the backend, but the
// frontend can only support gym-lock campaigns because visitHistory is already
// gym-only. A future non-gym campaign would need the API payload extended.

import { rigaPeriodKey } from './counting';

const METRIC = { lockIds: ['19228015'], dedup: 'calendar-day', timezone: 'Europe/Riga' };
const BONUS_DAYS_TIERS = [
  { visitsRequired: 8, daysToAward: 3 },
  { visitsRequired: 12, daysToAward: 2 },
  { visitsRequired: 16, daysToAward: 1 },
];

// Each monthly bonus-days campaign is identical except for id + period.
export const CAMPAIGNS = [
  ['bonus-days-2026-07', '2026-07'],
  ['bonus-days-2026-08', '2026-08'],
].map(([id, periodKey]) => ({
  id,
  active: true,
  periodKey,
  metric: METRIC,
  tiers: BONUS_DAYS_TIERS,
}));

// The campaign whose period is the current Riga month, if active.
export function getActiveCampaign(now = new Date()) {
  const key = rigaPeriodKey(now);
  return CAMPAIGNS.find((c) => c.active && c.periodKey === key) || null;
}

// "2026-08" → "31.08" — the campaign's last day, for the deadline badge.
// Derived from periodKey rather than hardcoded so it stays correct if a later
// month is added. Day 0 of the next month is the last day of this one; plain
// UTC arithmetic, since this is a calendar label and never a timestamp.
export function periodEndLabel(periodKey) {
  const [year, month] = periodKey.split('-').map(Number);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return `${String(lastDay).padStart(2, '0')}.${String(month).padStart(2, '0')}`;
}
