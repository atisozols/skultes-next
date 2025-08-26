'use client';

import React, { useState } from 'react';
import { CollapsibleLight } from './Collapsible';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggleOpen = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const faqs = [
    {
      index: 0,
      title: 'Kurš var saņemt atlaidi?',
      text:
        'Lielās zāles abonements ar 40% atlaidi pieejams skolēniem, studentiem līdz 25 gadu vecumam un pensionāriem (vīrieši no 65 gadu vecuma un sievietes no 63 gadu vecuma). Studentu atlaidei nepieciešama studentu apliecība, ISIC karte vai izziņa no skolas. Pensionāriem nepieciešama apliecība vai personu apliecinošs dokuments.',
    },
    {
      index: 1,
      title: 'Vai par Privāto zāli jāmaksā katram, kurš apmeklē zāli veiktajā rezervācijā?',
      text:
        'Nē, apmaksu veic tikai tas, kurš veic rezervāciju. Rezervētajā laikā zāli var apmeklēt kopā ar citiem bez papildus maksas.',
    },
  ];

  return (
    <section id="faq" className="pt-16">
      <div className="flex flex-col items-center justify-center gap-2 px-5 text-center">
        <h2 className="bakbak text-3xl font-semibold md:text-5xl">Biežāk uzdotie jautājumi</h2>
      </div>
      <div className="mx-auto mt-6 w-full max-w-xl px-4 lg:max-w-2xl">
        <div className="flex flex-col gap-5">
          {faqs.map((c) => (
            <CollapsibleLight
              key={c.index}
              isOpen={openIndex === c.index}
              toggleOpen={() => toggleOpen(c.index)}
            >
              <span>{c.title}</span>
              <p className="font-extralight text-white/90">{c.text}</p>
            </CollapsibleLight>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
