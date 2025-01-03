import HomeShortcuts from './HomeShortcuts';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center gap-5 rounded-3xl bg-white px-10 py-20 text-center sm:px-16 sm:py-24 lg:px-32 lg:py-36 dark:bg-background">
      <h3 className="max-w-2xl text-4xl font-extrabold tracking-tight text-background sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
        Trenējies vienatnē un sasniedz vairāk!
      </h3>
      <p className="max-w-xs tracking-tight text-background sm:max-w-sm sm:text-lg md:text-xl lg:max-w-md lg:text-2xl dark:text-white">
        Izvēlies sporta zāli bez cilvēku pūļa un gaidīšanas rindā
      </p>
      <HomeShortcuts />
    </div>
  );
};

export default HeroSection;
