import HeroSection from '@/components/home/HeroSection';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      {/* <div className="bg-background absolute top-0 h-screen w-screen -z-10"></div> */}
      <Navbar />
      <main className="flex flex-col gap-8 justify-center w-full">
        <HeroSection />
      </main>
    </>
  );
}
