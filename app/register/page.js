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

      <Section title="Reģistrācija" className="items-center">
        <RegistrationForm />
      </Section>
    </Main>
  );
};

export default Page;
