import BigLogo from '@/components/home/BigLogo';
import HomeShortcuts from '@/components/home/HomeShortcuts';

export default function Home() {
  return (
    <div className="bg-background absolute top-0 h-screen w-screen">
      <main className="flex flex-col gap-8 items-center justify-center pt-48">
        <BigLogo />
        <HomeShortcuts />
      </main>
    </div>
  );
}
