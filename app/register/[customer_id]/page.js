import React from 'react';
import Container from '@/components/ui/Container';
import Main from '@/components/layout/Main';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import FAQ from '@/components/sections/FAQ';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Reģistrācija veiksmīga!',
  description: 'Jūsu reģistrācija ir veiksmīga.',
};

const Page = async ({ params }) => {
  const { customer_id } = await params;

  return (
    <Main className="flex flex-col items-center justify-center gap-8 p-4 py-10">
      <Link href="/">
        <Image
          src="/logo_red.png"
          alt="Skultes logo"
          className="h-12 w-auto"
          height={48}
          width={240}
          priority
        />
      </Link>
      <h1 className="bakbak text-center text-3xl font-semibold md:text-5xl">
        Reģistrācija veiksmīga!
      </h1>
      <Container className="flex w-full max-w-4xl flex-col items-center justify-center gap-5 px-5 py-6 text-center">
        <div className="max-w-2xl">
          <div className="space-y-3 font-extralight md:text-xl">
            <h2 className="text-xl font-medium md:text-2xl">
              Laipni lūdzam sporta klubā &quot;Ozols&quot;!
            </h2>
            <p>
              Tavs konts ir izveidots. Lai pieslēgtos platformai,{' '}
              <span className="font-light">
                izmanto norādes e-pastā vai pieslēdzies, izmantojot pogu zemāk
              </span>
              .
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3">
            <Button
              href="/log-in"
              size="lg"
              className="mx-auto w-full max-w-sm font-medium uppercase"
              withArrow
            >
              Ienākt
            </Button>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-alternate">
            Reģistrācijas ID: <span className="font-mono font-medium">{customer_id}</span>
          </p>
        </div>
      </Container>

      {/* FAQ block styled like Landing */}
      <section id="faq-success" className="w-full pt-8 md:pt-12">
        <div className="flex flex-col items-center justify-center gap-2 px-5 text-center">
          <h2 className="bakbak text-3xl font-semibold md:text-5xl">Biežāk uzdotie jautājumi</h2>
        </div>
        <Section id="faq" className="mx-auto max-w-4xl px-0 pt-8">
          <FAQ />
        </Section>
      </section>
    </Main>
  );
};

export default Page;
