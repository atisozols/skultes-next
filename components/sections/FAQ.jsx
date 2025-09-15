'use client';

import React, { useState } from 'react';
import { CollapsibleLight } from './Collapsible';
import { IoShareOutline } from 'react-icons/io5';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggleOpen = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const faqs = [
    {
      index: 0,
      title: 'Kā saglabāt/lejupielādēt platformas lietotni?',
      text: (
        <span className="relative">
          Ienākot mūsu platformā, izmantojot jebkuru no tīmekļa pārlūkiem (Safari, Chrome u.c.),
          nospiedīsiet <span className="font-medium">Share</span> vai{' '}
          <span className="font-medium">Dalīties</span> (dažkārt apzīmēts ar{' '}
          <IoShareOutline className="relative -top-px inline-block h-3.5 w-3.5" />) un izvēlieties{' '}
          <span className="font-medium">Pievienot Sākuma Ekrānam</span> vai{' '}
          <span className="font-medium">Add to Home Screen</span>.
        </span>
      ),
    },
    {
      index: 1,
      title: 'Kā iegādāties abonementu?',
      text: (
        <span>
          Pēc veiksmīgas reģistrācijas nepieciešams ienākt{' '}
          <a href="https://ozols.club/log-in" className="font-light hover:underline">
            mūsu platformā
          </a>
          , izmantojot e-pastu vai tel. numuru, kurš bija reģistrācijas laikā. Tur varēsiet
          izvēlēties abonementa laiku un veikt apmaksu.
        </span>
      ),
    },
    {
      index: 2,
      title: 'Kāds ir darba laiks?',
      text: (
        <span>
          Esam atvērti katru dienu <span className="font-light">no 5:00 līdz 23:00</span>.
        </span>
      ),
    },
    {
      index: 3,
      title: 'Kā ar jums sazināties?',
      text: (
        <span>
          Sazinies ar mums, rakstot uz{' '}
          <a href="mailto:atis@ozols.club" className="font-light hover:underline">
            atis@ozols.club
          </a>
          .
        </span>
      ),
    },
    {
      index: 4,
      title: 'Kur atrodas klubs?',
      text: (
        <span>
          Brīvības laukumā 4, Tukumā -
          <span className="font-light">
            {' '}
            ieeju atradīsiet ejot no Harmonijas ielas pagalma pusē
          </span>
          .
        </span>
      ),
    },
    {
      index: 5,
      title: 'Vai par Privāto zāli jāmaksā katram apmeklētājam?',
      text: (
        <span>
          Nē, apmaksu veic tikai tas, kurš veic rezervāciju. Rezervētajā laikā zāli{' '}
          <span className="font-light">
            var apmeklēt kopā ar citiem reģistrētiem kluba biedriem bez papildus maksas
          </span>
          .
        </span>
      ),
    },

    {
      index: 6,
      title: 'Vai ir iespējams redzēt zāles noslogojumu?',
      text: (
        <span>
          Ar aktīvu abonementu ir iespējams redzēt aptuveno Lielās zāles noslogojumu, lai atrastu
          piemērotu brīdi apmeklējumam.
        </span>
      ),
    },
    {
      index: 7,
      title: 'Vai varu maksāt uz vietas?',
      text: (
        <span>
          Visi maksājumi notiek <span className="font-light">tikai digitālajā platformā</span>.
          Reģistrējies, veic apmaksu un nāc trenēties!
        </span>
      ),
    },
    {
      index: 8,
      title: 'Kā notiek piekļuve ar digitālajām ieejas kartēm?',
      text: (
        <span>
          Reģistrējoties platformā, <span className="font-light">saņemsiet digitālās ieejas</span>{' '}
          ģērbtuvēm, kā arī Lielajai zālei, ja abonements ir aktīvs. Mūsu telpām ir QR karšu
          skeneri, kas apstrādās Jūsu ieejas kartes un ielaidīs Jūs telpās.
        </span>
      ),
    },
    {
      index: 9,
      title: 'Kā varu dabūt maksājuma čekus ar rekvizītiem?',
      text: (
        <span>
          Dotieties{' '}
          <a href="https://zenvoice.io/p/688c79153f1963728167fc0d" className="underline">
            šeit
          </a>{' '}
          un, izmantojot savu e-pastu, piekļūsiet visiem pirkumu čekiem un varēsiet pievienot
          nepieciešamo informāciju. Mūsu rekvizīti, ja nepieciešams:
          <br />
          <br /> SIA Nora24
          <br /> Reģ.nr. 40203540375
          <br /> PVN nr. LV40203540375
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3.5 md:gap-5">
      {faqs.map((c) => (
        <CollapsibleLight
          key={c.index}
          isOpen={openIndex === c.index}
          toggleOpen={() => toggleOpen(c.index)}
        >
          <span>{c.title}</span>
          <div className="text-justify font-extralight text-white/90">{c.text}</div>
        </CollapsibleLight>
      ))}
    </div>
  );
};

export default FAQ;
