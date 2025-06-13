import Main from '../../components/layout/Main';
import Link from 'next/link';

const Page = () => {
  return (
    <Main>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex flex-col items-center justify-center">
          <Link href="/" className="mb-6 text-accent hover:underline">
            ← Atpakaļ uz sākumlapu
          </Link>
          <h1 className="bakbak mb-4 text-center text-3xl font-semibold md:text-4xl">
            Privātuma politika
          </h1>
          <p className="mt-4 text-sm text-alternate">
            Pēdējo reizi atjaunināts: 2025. gada 13. jūnijs
          </p>
        </div>

        <div className="prose-invert prose-accent prose mx-auto max-w-none">
          <ol className="list-decimal space-y-3 pl-5">
            <li>
              Sporta klubs nedrīkst atklāt jebkādu informāciju par Klientu, apmeklējumiem,
              rezervācijām un nosacījumiem trešajām pusēm.
            </li>
            <li>
              Sporta klubs apstrādā savu Klientu personas datus saskaņā ar Vispārīgās datu
              aizsardzības regulas prasībām un citiem piemērojamiem tiesību aktiem un saskaņā ar
              Privātuma politikas nosacījumiem.
            </li>
          </ol>
        </div>
      </div>
    </Main>
  );
};

export default Page;
