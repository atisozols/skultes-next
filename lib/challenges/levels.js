// Membership levels derived from all-time gym visit-days (visitStats.totalVisits).
//
// The table below lists, per level, how many more visits are needed to advance
// and the cumulative total at which the NEXT level begins. Level 1 runs until
// 10 visits; at exactly 10 you become level 2; at 25 level 3; and so on.
//
// LEVEL_THRESHOLDS[i] = the total-visit count at which you leave level (i+1) and
// enter level (i+2). Derived by cumulatively summing "visits to next level".
export const LEVEL_THRESHOLDS = [
  10, // → level 2
  25, // → level 3
  50, // → level 4
  75, // → level 5
  125, // → level 6
  175, // → level 7
  250, // → level 8
  350, // → level 9
  475, // → level 10
  625, // → level 11
  825, // → level 12
  1075, // → level 13
  1375, // → level 14
  1775, // → level 15
  2275, // → level 16 (open-ended top)
];

// Returns { level, levelStart, nextThreshold, visitsToNext, progress, isMax }.
export function levelFromVisits(totalVisits) {
  const total = Math.max(0, Number(totalVisits) || 0);
  const passed = LEVEL_THRESHOLDS.filter((t) => total >= t).length;
  const level = passed + 1;

  const levelStart = passed === 0 ? 0 : LEVEL_THRESHOLDS[passed - 1];
  const nextThreshold = passed < LEVEL_THRESHOLDS.length ? LEVEL_THRESHOLDS[passed] : null;
  const isMax = nextThreshold === null;

  const visitsToNext = isMax ? null : nextThreshold - total;
  const progress = isMax
    ? 1
    : Math.min(1, Math.max(0, (total - levelStart) / (nextThreshold - levelStart)));

  return { level, levelStart, nextThreshold, visitsToNext, progress, isMax };
}
