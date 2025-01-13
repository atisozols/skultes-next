import { SignIn, ClerkProvider, SignedOut } from '@clerk/nextjs';

const page = () => {
  return (
    <div className="flex h-full w-full flex-grow items-center justify-center">
      <SignedOut>
        <SignIn routing="path" path="/log-in" forceRedirectUrl="/" />
      </SignedOut>
    </div>
  );
};

export default page;
