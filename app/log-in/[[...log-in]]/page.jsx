const { SignIn, ClerkProvider, SignedOut } = require('@clerk/nextjs');

const page = () => {
  return (
    <div className="flex h-full flex-grow items-center justify-center">
      <SignedOut>
        <SignIn routing="path" path="/log-in" forceRedirectUrl="/" />
      </SignedOut>
    </div>
  );
};

export default page;
