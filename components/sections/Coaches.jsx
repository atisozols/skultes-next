'use client';
import React from 'react';
import Carousel from '../ui/Carousel';
import Coach from '../sessions/Coach';
import useResponsiveValue from '@/hooks/useResponsiveValue';
import Section from '../ui/Section';

const Coaches = () => {
  return (
    <Section title={<span className="text-2xl font-bold">Mūsu treneri</span>}>
      <Carousel
        width="100%"
        mode="snap"
        origin="auto"
        loop={false}
        perView={useResponsiveValue({
          minValue: 1.4,
          maxValue: 2.5,
          minWidth: 320,
          maxWidth: 1920,
        })}
        gap={useResponsiveValue({
          minValue: 4,
          maxValue: 16,
          minWidth: 320,
          maxWidth: 1024,
        })}
      >
        <Coach
          phone="+37126089445"
          size="xs"
          name="Iveta Jansone"
          title="Apļa un personalizētie spēka treniņi"
          image="iveta.jpg"
          quote="Mana galvenā misija ir radīt vidi, kurā ikviens justos piederīgs, neatkarīgi no vecuma, dzimuma vai citiem faktoriem, tādējādi veicinot fizisko un mentālo veselību sabiedrībā"
          specialties={['Personalizēti spēka treniņi', 'Apļa treniņi', 'Privāti treniņi']}
        />
        <Coach
          phone="+37129241681"
          size="xs"
          name="Jānis Ozols"
          title="Vispārīgā fiziskā sagatavotība"
          image="janis.jpg"
          quote="Tiecos enerģiski un motivējoši palīdzēt sasniegt Jūsu mērķus, vienlaikus veicinot ilgstošu mīlestību pret aktīvu dzīvesveidu"
          specialties={[
            'Fitness un bodibildings',
            'Spēka treniņi',
            'Svara samazināšana',
            'Treniņi ar savu ķermeņa svaru',
            'Treniņi iesācējiem',
          ]}
        />
      </Carousel>
    </Section>
  );
};

export default Coaches;
