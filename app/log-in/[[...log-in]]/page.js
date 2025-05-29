import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <div className="relative h-screen w-full">
      <Link href="/">
        <Image
          src="/logo_red.png"
          alt="Ielādē"
          width={750}
          height={204}
          className="mx-auto mt-10 w-3/5 max-w-[200px]"
        />
      </Link>

      <div className="flex h-2/3 w-full flex-col items-center justify-center gap-4">
        <SignIn routing="path" path="/log-in" forceRedirectUrl="/" />
        <div className="flex w-full items-center justify-center text-sm font-light text-accent">
          <p>
            Neesi reģistrējies?{' '}
            <Link href="/register" className="underline">
              Reģistrēties
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
