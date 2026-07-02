import { expect, test, describe } from 'vitest';
import { countVisitDaysInPeriod, rigaPeriodKey } from '../../lib/challenges/counting';
import { levelFromVisits, LEVEL_THRESHOLDS } from '../../lib/challenges/levels';
import { campaignProgress } from '../../lib/challenges/progress';

describe('countVisitDaysInPeriod', () => {
  test('counts only days in the given period', () => {
    const days = ['2026-06-30', '2026-07-01', '2026-07-15', '2026-07-31', '2026-08-01'];
    expect(countVisitDaysInPeriod(days, '2026-07')).toBe(3);
  });
  test('empty / invalid inputs → 0', () => {
    expect(countVisitDaysInPeriod([], '2026-07')).toBe(0);
    expect(countVisitDaysInPeriod(null, '2026-07')).toBe(0);
  });
});

describe('rigaPeriodKey', () => {
  test('a UTC time that is next-day in Riga buckets to the Riga month', () => {
    // 2026-06-30 21:30 UTC = 2026-07-01 00:30 Riga (UTC+3 summer)
    expect(rigaPeriodKey(new Date('2026-06-30T21:30:00Z'))).toBe('2026-07');
  });
});

describe('levelFromVisits', () => {
  test('level 1 until 10, level 2 at exactly 10', () => {
    expect(levelFromVisits(0).level).toBe(1);
    expect(levelFromVisits(9).level).toBe(1);
    expect(levelFromVisits(10).level).toBe(2);
  });
  test('boundaries follow the table', () => {
    expect(levelFromVisits(24).level).toBe(2);
    expect(levelFromVisits(25).level).toBe(3);
    expect(levelFromVisits(49).level).toBe(3);
    expect(levelFromVisits(50).level).toBe(4);
  });
  test('230 visits → level 7 with 20 to next (matches reference)', () => {
    const r = levelFromVisits(230);
    expect(r.level).toBe(7);
    expect(r.visitsToNext).toBe(20);
    expect(r.nextThreshold).toBe(250);
    expect(r.levelStart).toBe(175);
  });
  test('progress is fractional within the band', () => {
    const r = levelFromVisits(230); // (230-175)/(250-175) = 55/75
    expect(r.progress).toBeCloseTo(55 / 75, 5);
  });
  test('beyond the last threshold → max level, no next', () => {
    const r = levelFromVisits(3000);
    expect(r.isMax).toBe(true);
    expect(r.visitsToNext).toBeNull();
    expect(r.level).toBe(LEVEL_THRESHOLDS.length + 1);
  });
});

describe('campaignProgress (cumulative tiers)', () => {
  const campaign = {
    periodKey: '2026-07',
    tiers: [
      { visitsRequired: 8, daysToAward: 3 },
      { visitsRequired: 12, daysToAward: 2 },
      { visitsRequired: 16, daysToAward: 1 },
    ],
  };
  const mkVisits = (n) =>
    Array.from({ length: n }, (_, i) => ({ date: `2026-07-${String(i + 1).padStart(2, '0')}` }));

  test('9 visits → tier 1 cleared, 3 days, next tier at 12', () => {
    const p = campaignProgress(mkVisits(9), campaign);
    expect(p.countedVisits).toBe(9);
    expect(p.tiersCleared.length).toBe(1);
    expect(p.daysEarned).toBe(3);
    expect(p.nextTier.visitsRequired).toBe(12);
    expect(p.visitsToNext).toBe(3);
  });
  test('16 visits → all tiers, cumulative 6 days, no next tier', () => {
    const p = campaignProgress(mkVisits(16), campaign);
    expect(p.tiersCleared.length).toBe(3);
    expect(p.daysEarned).toBe(6);
    expect(p.nextTier).toBeNull();
  });
  test('visits outside the period are not counted', () => {
    const visits = [{ date: '2026-06-20' }, { date: '2026-08-02' }, { date: '2026-07-05' }];
    const p = campaignProgress(visits, campaign);
    expect(p.countedVisits).toBe(1);
  });
});
