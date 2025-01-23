import { MdArrowForward } from 'react-icons/md';
import Card from '../ui/Card';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { HiQrcode } from 'react-icons/hi';

const ProfileCard = async () => {
  const user = await currentUser();

  if (!user) return null;
  const res = await fetch(`http://api.tezaurs.lv:8182/inflect_people/json/${user.firstName}`);
  if (res.ok) {
    const data = await res.json();
    const vokativs = data[0][5] ? data[0][5] : data[0][0];

    return (
      <Card>
        <h2 className="text-xl font-medium">
          {vokativs['Dzimte'] === 'Sieviešu'
            ? `Sveika, ${vokativs['Vārds']}`
            : vokativs['Dzimte'] === 'Nepiemīt'
              ? `Sveiki, ${vokativs['Vārds']}`
              : `Sveiks, ${vokativs['Vārds']}`}
          !
        </h2>
        <p>Tavs pēdējais apmeklējums bija pirms X dienām</p>
      </Card>
    );
  }
};

export default ProfileCard;
