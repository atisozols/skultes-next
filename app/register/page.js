import RegistrationForm from '@/components/register/RegistrationForm';
import Main from '@/components/layout/Main';
import Section from '@/components/ui/Section';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  return (
    <Main className="justify-center">
      <div className="mb-8 mt-4 flex justify-center">
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
      </div>

      <Section className="items-center">
        <h2 className="bakbak text-2xl font-semibold md:text-3xl">Reģistrācija</h2>
        <RegistrationForm />
      </Section>
    </Main>
  );
};

export default Page;
