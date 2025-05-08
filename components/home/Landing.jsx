'use client';
import Image from 'next/image';
import TopNav from '../ui/TopNav';
import { Button } from '../ui/Button';
import Carousel from '../ui/Carousel';
import { LuCalendarCheck, LuLock, LuShieldCheck } from 'react-icons/lu';
import { MdOutlineAutoAwesome } from 'react-icons/md';

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full">
      <TopNav />
      <Image src="/hero.jpg" alt="Sporta klubs Hero" fill className="object-cover" priority />
      <div className="absolute inset-0 flex flex-col items-center justify-end bg-black bg-opacity-40">
        <div className="h-[45%] px-4 text-center">
          <div className="flex h-full flex-col items-center justify-start">
            <div>
              <h1 className="mb-4 text-4xl font-black uppercase text-white md:text-6xl">
                Sasniedz jaunas spēka virsotnes
              </h1>
              <p className="text-xl font-extralight text-white md:text-2xl">
                Trenējies privāti, grupās vai kopā ar kluba biedriem
              </p>
            </div>
            <div className="flex h-full w-full flex-grow items-center justify-center">
              <Button href="/register" size="lg" className="uppercase" withArrow>
                Pievienoties tagad
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const images = [
    { src: '/carousel/1.png', alt: 'Slide 1', width: 1536, height: 1024 },
    { src: '/carousel/2.png', alt: 'Slide 2', width: 1536, height: 1024 },
    { src: '/carousel/3.png', alt: 'Slide 3', width: 1536, height: 1024 },
    { src: '/carousel/4.png', alt: 'Slide 4', width: 1536, height: 1024 },
  ];

  const features = [
    {
      icon: <LuLock className="text-3xl text-accent" />,
      title: 'Privāta telpa tikai Tev',
    },
    {
      icon: <LuCalendarCheck className="text-3xl text-accent" />,
      title: 'Rezervācija jebkurā laikā',
    },
    {
      icon: <MdOutlineAutoAwesome className="text-3xl text-accent" />,
      title: 'Moderns inventārs',
    },
    {
      icon: <LuShieldCheck className="text-3xl text-accent" />,
      title: 'Īpašas cenas PRO biedriem',
    },
  ];

  return (
    <main className="flex w-full flex-col justify-center">
      <HeroSection />
      <section id="about" className="flex flex-col items-center justify-center gap-5 py-8">
        <div className="flex flex-col items-center justify-center px-5 text-center">
          <h2 className="text-2xl font-semibold">Privātums. Kvalitāte. Spēks.</h2>
          <p className="font-light">Radīts Tukuma sportistiem, domāts rezultātiem.</p>
        </div>
        <Carousel width="100%">
          {images.map((image) => (
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
          ))}
        </Carousel>
        <div className="flex flex-col items-center justify-center px-5 text-center font-extralight">
          <p>
            Ozols Gym ir jaunākais sporta klubs Tukumā, piedāvājot privātu VIP treniņu pieredzi.
            Radīts tiem, kuri novērtē mieru, modernu aprīkojumu un rezultātu virzītu vidi.
          </p>
        </div>
      </section>

      <section id="vip" className="flex flex-col items-center justify-center gap-5 py-8">
        <div className="flex flex-col items-center justify-center px-5 text-center">
          <h2 className="text-2xl font-semibold">Trenējies pēc saviem noteikumiem</h2>
          <p className="font-light">
            VIP zāle pieejama tikai tev. Bez traucējumiem. Ar vislabāko aprīkojumu.
          </p>
        </div>
        <Carousel width="100%">
          {images.map((image) => (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="rounded-2xl"
            />
          ))}
        </Carousel>
        <div className="flex flex-col items-center justify-center px-5 text-center font-extralight">
          <ul>
            {features.map((feature, index) => (
              <li
                className={`${index < features.length - 1 && 'border-b'} flex items-center justify-center gap-3 border-transparent p-3 font-light`}
                style={{
                  borderImage:
                    'linear-gradient(to right, transparent, var(--accent), transparent) 1',
                }}
              >
                {feature.icon}
                <span className="text-lg">{feature.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button href="/register" size="lg" className="font-medium uppercase" withArrow>
          Rezervēt VIP zāli
        </Button>
        <span className="relative -top-2 text-xs font-light">
          Reģistrējies un rezervē savu treniņu laiku
        </span>
      </section>

      <section id="groups" className="flex flex-col items-center justify-center gap-5 py-8">
        <div className="flex flex-col items-center justify-center px-5 text-center">
          <h2 className="text-2xl font-semibold">Enerģija kopā ar citiem</h2>
          <p className="font-light">Izkusties kopā, iedvesmojies un sasniedz jaunu līmeni</p>
        </div>
        <Carousel width="100%" origin="auto">
          {images.map((image) => (
            <div className="flex flex-col items-start gap-2.5 px-5">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="rounded-2xl"
              />
              <div>
                <h5>Intervālu treniņš</h5>
                <p className="text-sm font-light">Trešdien, 19:00</p>
              </div>
              <Button href="/register" size="sm" className="font-medium uppercase" withArrow>
                Rezervē savu vietu
              </Button>
            </div>
          ))}
        </Carousel>
      </section>

      <section id="coaches">
        <h2 className="text-2xl font-semibold">Personalizēts ceļš uz rezultātu</h2>
        <p className="font-light">Satiec mūsu trenerus un atrodi sev piemērotāko pieeju</p>
      </section>
    </main>
  );
};

export default Landing;
