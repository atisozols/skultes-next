import { UserButton } from '@clerk/nextjs';
import Section from '../ui/Section';
import { currentUser } from '@clerk/nextjs/server';

const Profile = async () => {
  const user = await currentUser();

  if (!user) return null;
  const res = await fetch(`http://api.tezaurs.lv:8182/inflect_people/json/${user.firstName}`);
  if (res.ok) {
    const data = await res.json();
    const vokativs = data[0][5] ? data[0][5] : data[0][0];

    return (
      <Section>
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-alternate text-xs font-semibold uppercase">
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
          <UserButton />
        </div>
      </Section>
    );
  }
};

export default Profile;
