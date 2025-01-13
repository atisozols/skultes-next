import HeroSection from '@/components/home/HeroSection';
import Navbar from '@/components/Navbar';
import { SignedOut, SignedIn } from '@clerk/nextjs';

export default function Home() {
  return (
    <>
      <SignedOut>
        <main className="z-10 flex w-full flex-col justify-center gap-8">
          <HeroSection />
        </main>
      </SignedOut>

      <SignedIn>
        <Navbar />
        <main className="z-10 flex w-full flex-col justify-center gap-8"></main>
      </SignedIn>
    </>
  );
}
