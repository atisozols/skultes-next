import Section from '../ui/Section';
import { currentUser } from '@clerk/nextjs/server';
import UserButtonWrapper from './UserButtonWrapper';

// Latvian vocative for a first name — replaces the old external Tezaurs API
// call (http, non-standard port), which was unreliable and blocked the whole
// server-rendered greeting for up to 2.5s on every load.
//
// Masculine names in the 1st/2nd/3rd declensions end in -s / -š and drop that
// ending in the vocative:
//   1st  -s   Toms → Tom, Roberts → Robert
//   2nd  -is  Jānis → Jāni, Kārlis → Kārli
//   3rd  -us  Ingus → Ingu, Markus → Marku
//        -š   Mārtiņš → Mārtiņ
// Names ending in a vowel (Renē, Otto, Anna, Ilze, …) are left unchanged —
// their vocative equals the nominative.
function latvianVocative(name) {
  if (!name) return name;
  if (name.endsWith('š')) return name.slice(0, -1);
  if (name.endsWith('s')) return name.slice(0, -1);
  return name;
}

const Profile = async () => {
  const user = await currentUser();

  if (!user) return null;

  const greeting = latvianVocative(user.firstName ?? '');

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
          <h2 className="text-3xl font-bold">Čau{greeting ? `, ${greeting}` : ''}!</h2>
        </div>
        <UserButtonWrapper />
      </div>
    </Section>
  );
};

export default Profile;
