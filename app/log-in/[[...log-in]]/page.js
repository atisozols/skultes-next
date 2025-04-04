import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

const page = () => {
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-start gap-16 pt-16">
      <Image
        src="/logo_red.png"
        alt="Ielādē"
        width={750}
        height={204}
        className="mx-auto w-3/5 max-w-xs"
      />
      <SignIn routing="path" path="/log-in" forceRedirectUrl="/" />
    </div>
  );
};

export default page;
