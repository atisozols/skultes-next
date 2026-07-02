// SHARED PURE FUNCTION — must stay byte-for-byte in sync with the backend copy
// at skultesapi/challenges/counting.js. A shared JSON fixture tests both.
//
// Counts unique gym visit-days that fall in a given period. Input is a list of
// already-normalized Riga calendar-day strings ("YYYY-MM-DD"); on the frontend
// these come straight from statistics.visitStats.visitHistory[].date, which is
// already gym-lock-only and deduped to one per Europe/Riga day.

export function countVisitDaysInPeriod(visitDays, periodKey) {
  if (!Array.isArray(visitDays)) return 0;
  return visitDays.filter((d) => typeof d === 'string' && d.slice(0, 7) === periodKey).length;
}

// Current period key ("YYYY-MM") in Europe/Riga time.
export function rigaPeriodKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Riga',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .slice(0, 7);
}
