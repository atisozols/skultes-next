'use client';
// DEV PREVIEW — state-scenario matrix for the progress components.
// Not linked in the app; visit /preview/states directly.

import Container from '@/components/ui/Container';
import AttendanceCard from '@/components/membership/AttendanceCard';
import CampaignCard from '@/components/membership/CampaignCard';

const MOCK_CAMPAIGN = {
  id: 'preview',
  periodKey: '2026-07',
  metric: { lockIds: ['19228015'] },
  tiers: [
    { visitsRequired: 8, daysToAward: 3 },
    { visitsRequired: 12, daysToAward: 2 },
    { visitsRequired: 16, daysToAward: 1 },
  ],
};

const pad = (n) => String(n).padStart(2, '0');
const asHistory = (dates) =>
  [...new Set(dates)].sort((a, b) => b.localeCompare(a)).map((date) => ({ date }));

// N visit-days in July 2026 (drives the campaign count).
const julyHistory = (n) => asHistory(Array.from({ length: n }, (_, i) => `2026-07-${pad(i + 1)}`));

// A richer multi-month history for the attendance grid.
const attendanceHistory = asHistory([
  ...Array.from({ length: 12 }, (_, i) => `2026-07-${pad(i * 2 + 1)}`),
  ...Array.from({ length: 11 }, (_, i) => `2026-06-${pad(i * 2 + 2)}`),
  ...Array.from({ length: 9 }, (_, i) => `2026-05-${pad(i * 3 + 2)}`),
  ...Array.from({ length: 7 }, (_, i) => `2026-04-${pad(i * 4 + 1)}`),
  ...Array.from({ length: 6 }, (_, i) => `2026-03-${pad(i * 4 + 3)}`),
]);

const CAMPAIGN_STATES = [
  { caption: '0 visits — no tier (0–7 msg)', n: 0 },
  { caption: '5 visits — no tier yet', n: 5 },
  { caption: '8 visits — tier 1 cleared (8–11 msg)', n: 8 },
  { caption: '11 visits — still tier 1', n: 11 },
  { caption: '12 visits — tier 2 cleared (12–15 msg)', n: 12 },
  { caption: '15 visits — still tier 2', n: 15 },
  { caption: '16 visits — all bonuses (16+ msg)', n: 16 },
  { caption: '22 visits — all cleared, capped', n: 22 },
];

const LEVEL_STATES = [
  { caption: 'level 1 · 0 total', total: 0 },
  { caption: 'level 1 · 9 total (1 to L2)', total: 9 },
  { caption: 'level 2 · 19 total', total: 19 },
  { caption: 'level 4 · 60 total', total: 60 },
  { caption: 'level 6 · 143 total (matches ref)', total: 143 },
  { caption: 'level 7 · 230 total', total: 230 },
  { caption: 'level 10 · 624 total (1 to L11)', total: 624 },
  { caption: 'max level · 3000 total', total: 3000 },
];

const Cell = ({ caption, children }) => (
  <div className="flex w-full max-w-sm flex-col gap-2">
    <span className="font-mono text-xs text-alternate">{caption}</span>
    <Container>{children}</Container>
  </div>
);

export default function StatesPreview() {
  return (
    <main className="min-h-screen w-full bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-1 text-3xl font-bold">Component states — preview</h1>
        <p className="mb-10 text-sm text-alternate">
          Every state scenario for the Izaicinājums (campaign) and Progress (level +
          attendance) components.
        </p>

        <h2 className="mb-4 text-xl font-bold text-accent">Izaicinājums — campaign</h2>
        <div className="mb-14 flex flex-wrap gap-6">
          {CAMPAIGN_STATES.map((s, i) => (
            <Cell key={i} caption={s.caption}>
              <div className="px-5 py-5">
                <CampaignCard campaign={MOCK_CAMPAIGN} visitHistory={julyHistory(s.n)} />
              </div>
            </Cell>
          ))}
        </div>

        <h2 className="mb-4 text-xl font-bold text-accent">Progress — level &amp; attendance</h2>
        <div className="flex flex-wrap gap-6">
          {LEVEL_STATES.map((s, i) => (
            <Cell key={i} caption={s.caption}>
              <AttendanceCard totalVisits={s.total} visitHistory={attendanceHistory} />
            </Cell>
          ))}
        </div>
      </div>
    </main>
  );
}
