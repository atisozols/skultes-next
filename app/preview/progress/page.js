'use client';
// DEV PREVIEW — renders the merged progress card across many states. Not linked
// in the app; visit /preview/progress directly. Uses explicit props (no useUser)
// and a fixed-period mock campaign so it renders identically regardless of date.

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

// Build a plausible visitHistory (desc by date, like the real API): `julyCount`
// days in July 2026 for the campaign + scattered earlier days for grid texture.
const mkHistory = (julyCount) => {
  const dates = new Set();
  for (let i = 1; i <= julyCount; i++) dates.add(`2026-07-${String(i).padStart(2, '0')}`);
  // deterministic scatter over the prior ~5 months
  for (const [mo, days] of [['06', 12], ['05', 9], ['04', 7], ['03', 5], ['02', 4]]) {
    for (let k = 0; k < days; k++) {
      const day = ((k * 7 + 3) % 27) + 1;
      dates.add(`2026-${mo}-${String(day).padStart(2, '0')}`);
    }
  }
  return [...dates].sort((a, b) => b.localeCompare(a)).map((date) => ({ date }));
};

const RICH_HISTORY = mkHistory(9);

const PreviewCard = ({ caption, totalVisits, visitHistory }) => (
  <div className="flex w-full max-w-sm flex-col gap-2">
    <span className="font-mono text-xs text-alternate">{caption}</span>
    <Container>
      <AttendanceCard totalVisits={totalVisits} visitHistory={visitHistory} />
      <div className="h-px w-full bg-border" />
      <div className="px-5 py-5">
        <CampaignCard campaign={MOCK_CAMPAIGN} visitHistory={visitHistory} />
      </div>
    </Container>
  </div>
);

const LEVEL_CASES = [
  { caption: 'level 1 · 0 total', totalVisits: 0 },
  { caption: 'level 1 · 9 total (1 to L2)', totalVisits: 9 },
  { caption: 'level 2 · 10 total', totalVisits: 10 },
  { caption: 'level 3 · 25 total', totalVisits: 25 },
  { caption: 'level 5 · 75 total', totalVisits: 75 },
  { caption: 'level 7 · 230 total (20 to L8)', totalVisits: 230 },
  { caption: 'level 10 · 624 total (1 to L11)', totalVisits: 624 },
  { caption: 'max level · 3000 total', totalVisits: 3000 },
];

const CAMPAIGN_CASES = [
  { caption: 'monthly: 0 visits', julyCount: 0 },
  { caption: 'monthly: 1 (grammar: apmeklējums)', julyCount: 1 },
  { caption: 'monthly: 8 (tier 1, +3)', julyCount: 8 },
  { caption: 'monthly: 9 (reference)', julyCount: 9 },
  { caption: 'monthly: 12 (tier 2)', julyCount: 12 },
  { caption: 'monthly: 16 (all tiers, +6)', julyCount: 16 },
];

export default function ProgressPreview() {
  return (
    <main className="min-h-screen w-full bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-1 text-3xl font-bold">Progress card — preview</h1>
        <p className="mb-8 text-sm text-alternate">
          Merged level + attendance card (level bar → stats → grid), with the monthly
          campaign card below.
        </p>

        <h2 className="mb-4 text-xl font-bold text-accent">Level variations</h2>
        <div className="mb-12 flex flex-wrap gap-6">
          {LEVEL_CASES.map((c, i) => (
            <PreviewCard
              key={i}
              caption={c.caption}
              totalVisits={c.totalVisits}
              visitHistory={RICH_HISTORY}
            />
          ))}
        </div>

        <h2 className="mb-4 text-xl font-bold text-accent">Campaign / stepper variations</h2>
        <div className="flex flex-wrap gap-6">
          {CAMPAIGN_CASES.map((c, i) => (
            <PreviewCard
              key={i}
              caption={c.caption}
              totalVisits={230}
              visitHistory={mkHistory(c.julyCount)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
