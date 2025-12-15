import Section from '../ui/Section';
import { currentUser } from '@clerk/nextjs/server';
import UserButtonWrapper from './UserButtonWrapper';

const Profile = async () => {
  const user = await currentUser();

  if (!user) return null;

  const firstName = user.firstName ?? '';
  let vokativs = { Vārds: firstName, Dzimte: 'Nepiemīt' };

  try {
    if (firstName) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      try {
        const res = await fetch(
          `http://api.tezaurs.lv:8182/inflect_people/json/${encodeURIComponent(firstName)}`,
          {
            signal: controller.signal,
            cache: 'no-store',
          },
        );

        if (res.ok) {
          const data = await res.json();
          const tezaursVokativs = data?.[0]?.[5] ?? data?.[0]?.[0];
          if (tezaursVokativs && typeof tezaursVokativs === 'object') {
            vokativs = tezaursVokativs;
          }
        }
      } finally {
        clearTimeout(timeoutId);
      }
    }
  } catch {}

  return (
    <Section>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase text-alternate">
            {new Date().toLocaleDateString('lv-LV', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </span>
          <h2 className="text-3xl font-bold">
            {vokativs['Dzimte'] === 'Sieviešu'
              ? `Čau, ${vokativs['Vārds']}`
              : vokativs['Dzimte'] === 'Nepiemīt'
                ? `Čau, ${vokativs['Vārds']}`
                : `Čau, ${vokativs['Vārds']}`}
            !
          </h2>
        </div>
        <UserButtonWrapper />
      </div>
    </Section>
  );
};

export default Profile;
