import HomeShortcuts from './HomeShortcuts';

const HeroSection = () => {
  return (
    <div className="p-10 py-20 bg-background rounded-3xl flex flex-col gap-5 sm:px-16 sm:py-24 lg:px-32 lg:py-36">
      <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold max-w-2xl text-white tracking-tight">
        Trenējies vienatnē un sasniedz vairāk!
      </h3>
      <p className="sm:text-lg md:text-xl lg:text-2xl text-white tracking-tight max-w-xs sm:max-w-sm lg:max-w-md">
        Izvēlies sporta zāli bez cilvēku pūļa un gaidīšanas rindā
      </p>
      <HomeShortcuts />
    </div>
  );
};

export default HeroSection;
