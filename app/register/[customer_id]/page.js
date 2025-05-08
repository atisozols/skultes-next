import React from 'react';
import Container from '@/components/ui/Container';
import Main from '@/components/layout/Main';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Reģistrācija veiksmīga!',
  description: 'Jūsu reģistrācija ir veiksmīga.',
};

const Page = async ({ params }) => {
  const { customer_id } = await params;

  return (
    <Main className="items-center">
      <Container className="flex flex-col items-center justify-center gap-12 py-12 text-center">
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
        <div className="max-w-md space-y-6">
          <h1 className="text-3xl font-bold">Reģistrācija veiksmīga!</h1>
          <div className="space-y-4">
            <p className="text-lg">Paldies, ka reģistrējāties ar Ozols Sports Club.</p>
            <p>
              Jūsu reģistrācija ir veiksmīga. Mēs esat nosūtījuši jums e-pastu ar informāciju par
              pievienošanos sistēmā.
            </p>
            <p>
              Lūdzu, pārbaudiet jūsu e-pasta saņemtāju un sekiet e-pastā esošo saiti, lai
              pievienotos sistēmā.
            </p>
            <p className="text-sm text-gray-500">
              Ja jūsu e-pasts nav jūsu saņemtāju, lūdzu, pārbaudiet spam vai neskaidrošu mapi.
            </p>
          </div>
          <div className="mt-8 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-green-700 dark:text-green-300">
              Jūsu reģistrācijas ID: <span className="font-mono font-medium">{customer_id}</span>
            </p>
          </div>
        </div>
      </Container>
    </Main>
  );
};

export default Page;
