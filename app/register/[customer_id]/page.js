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
    <Main className="items-center justify-center">
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
        <div className="max-w-md space-y-6 p-5">
          <h1 className="text-3xl font-bold">Reģistrācija veiksmīga!</h1>
          <div className="space-y-4">
            <p className="text-lg">Laipni lūdzam sporta klubā "Ozols"!</p>
            <p>
              Tavs konts ir veiksmīgi izveidots. Lai pieslēgtos savam kontam, meklē informāciju
              e-pastā!
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
