import HeroSection from '@/components/home/HeroSection';
import ProfileCard from '@/components/home/ProfileCard';
import QRCodeGenerator from '@/components/home/QRCodeGenerator';
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
        <main className="z-10 flex w-full max-w-6xl flex-col justify-center md:flex-row">
          <ProfileCard />
          <QRCodeGenerator />
        </main>
      </SignedIn>
    </>
  );
}
