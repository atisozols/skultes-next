'use client';

import { useUser } from '@/hooks/queries/useUser';
import { useMemo } from 'react';

const GYM_OPEN = 5;
const GYM_CLOSE = 23;
const HOURS = Array.from({ length: GYM_CLOSE - GYM_OPEN }, (_, i) => i + GYM_OPEN);

const getSituation = (live) => {
  if (live === 0) return 'Tukša zāle';
  if (live < 5) return 'Zems noslogojums';
  if (live < 15) return 'Vidējs noslogojums';
  if (live < 20) return 'Augsts noslogojums';
  return 'Maksimāls noslogojums';
};

const getOccupancyInfo = (live, avg) => {
  const situation = getSituation(live);

  if (live === 0) {
    return { comparison: null, situation, tone: 'success' };
  }
  if (avg === 0 || avg == null) {
    const tone = live < 15 ? 'success' : live < 20 ? 'warning' : 'error';
    return { comparison: null, situation, tone };
  }
  const ratio = live / avg;
  if (ratio < 0.8) return { comparison: 'Mierīgāk nekā parasti', situation, tone: 'success' };
  if (ratio <= 1.2) return { comparison: 'Kā parasti', situation, tone: 'success' };
  if (ratio <= 1.6) return { comparison: 'Rosīgāk nekā parasti', situation, tone: 'warning' };
  return { comparison: 'Daudz rosīgāk nekā parasti', situation, tone: 'error' };
};

const OccupancyGraph = () => {
  const { data: userData, isLoading } = useUser();
  const isMember = userData?.isMember;

  const hourlyAverage = userData?.statistics?.hourlyAverage;
  const live = userData?.statistics?.gymOccupancyStatus ?? 0;

  const currentHour = useMemo(() => {
    const now = new Date();
    const rigaOffset = 3;
    const utcHour = now.getUTCHours();
    return (utcHour + rigaOffset) % 24;
  }, []);

  const peak = useMemo(() => {
    if (!hourlyAverage) return 1;
    const values = Object.values(hourlyAverage).map(Number);
    return Math.max(...values, live, 1);
  }, [hourlyAverage, live]);

  if (isLoading || !isMember || !hourlyAverage) return null;

  const avgForCurrentHour = hourlyAverage?.[currentHour] ?? 0;
  const info = getOccupancyInfo(live, avgForCurrentHour);
  const isWithinHours = currentHour >= GYM_OPEN && currentHour < GYM_CLOSE;

  const toneTextClass =
    info.tone === 'success' ? 'text-success' : info.tone === 'warning' ? 'text-warning' : 'text-error';
  const toneFillClass =
    info.tone === 'success' ? 'bg-success' : info.tone === 'warning' ? 'bg-warning' : 'bg-error';

  return (
    <div
      className="mb-2 flex flex-col items-start gap-3 px-4 py-3"
      style={{ borderBottom: '0.5px solid var(--border)' }}
    >
      {/* Header */}
      <div className="flex w-full items-baseline justify-between">
        <div className="flex items-center gap-2">
          {isWithinHours ? (
            <>
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${toneFillClass}`}
                />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${toneFillClass}`} />
              </span>
              <span className={`text-xs font-medium ${toneTextClass}`}>
                {info.comparison ? `${info.comparison} · ${info.situation}` : info.situation}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-alternate">Zāle slēgta</span>
          )}
        </div>
      </div>

      {/* Graph */}
      <div className="flex w-full items-end gap-[3px]" style={{ height: 64 }}>
        {HOURS.map((hour) => {
          const avg = hourlyAverage?.[hour] ?? 0;
          const isCurrent = hour === currentHour && isWithinHours;

          if (isCurrent) {
            const avgPct = peak > 0 ? (avg / peak) * 100 : 0;
            const livePct = peak > 0 ? (live / peak) * 100 : 0;

            return (
              <div
                key={hour}
                className="relative flex flex-1 flex-col justify-end"
                style={{ height: '100%' }}
              >
                <div
                  className="absolute bottom-0 w-full rounded-sm bg-white/10"
                  style={{ height: `${Math.max(avgPct, 4)}%` }}
                />
                <div
                  className="relative w-full rounded-sm bg-accent"
                  style={{ height: `${Math.max(livePct, 4)}%` }}
                />
              </div>
            );
          }

          const heightPct = peak > 0 ? (avg / peak) * 100 : 0;
          return (
            <div key={hour} className="flex flex-1 flex-col justify-end" style={{ height: '100%' }}>
              <div
                className="w-full rounded-sm bg-white/10"
                style={{ height: `${Math.max(heightPct, 2)}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Hour labels */}
      <div className="flex w-full gap-[3px]">
        {HOURS.map((hour) => {
          const isCurrent = hour === currentHour && isWithinHours;
          const showLabel = hour % 3 === 0 || isCurrent;
          return (
            <div key={hour} className="flex flex-1 justify-center">
              {showLabel && (
                <span
                  className={`text-[10px] tabular-nums ${
                    isCurrent ? 'font-medium text-accent' : 'text-alternate'
                  }`}
                >
                  {hour}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OccupancyGraph;
