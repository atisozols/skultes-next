import HomeShortcuts from './HomeShortcuts';

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-background px-10 py-20 sm:px-16 sm:py-24 lg:px-32 lg:py-36">
      <h3 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        Trenējies vienatnē un sasniedz vairāk!
      </h3>
      <p className="max-w-xs tracking-tight text-white sm:max-w-sm sm:text-lg md:text-xl lg:max-w-md lg:text-2xl">
        Izvēlies sporta zāli bez cilvēku pūļa un gaidīšanas rindā
      </p>
      <HomeShortcuts />
    </div>
  );
};

export default HeroSection;
