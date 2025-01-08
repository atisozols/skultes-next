import HeroSection from '@/components/home/HeroSection';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      {/* <div className="absolute top-0 h-screen w-screen bg-white"></div> */}
      {/* <Navbar /> */}
      <main className="z-10 flex w-full flex-col justify-center gap-8">
        <HeroSection />
      </main>
    </>
  );
}
