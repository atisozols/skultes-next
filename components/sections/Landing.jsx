'use client';
import Image from 'next/image';
import TopNav from '../ui/TopNav';
import { Button } from '../ui/Button';
import Carousel from '../ui/Carousel';
import Coach from '../sessions/Coach';
import Container from '../ui/Container';
import { LuCalendarCheck, LuLock, LuSmile, LuSun } from 'react-icons/lu';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { TbCoinEuro } from 'react-icons/tb';
import { TiStarOutline } from 'react-icons/ti';
import useResponsiveValue from '../../hooks/useResponsiveValue';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full">
      <TopNav />
      <Image
        src="/hero.jpg"
        quality={100}
        alt="Sporta klubs Hero"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />
      <div className="absolute left-0 right-0 top-0 h-[20%] bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-end bg-black bg-opacity-50">
        <div className="min-h-[55%] px-4 py-12 text-center">
          <div className="flex flex-col items-center justify-start">
            <div className="mb-6 md:space-y-6">
              <h1 className="bakbak xs:text-5xl mb-4 text-4xl text-white sm:text-6xl md:text-7xl">
                Sasniedz jaunas spēka virsotnes
              </h1>
              <p className="font-slight text-lg text-white md:text-2xl">
                Izbaudi ceļu uz saviem mērķiem, trenējoties modernā un iedvesmojošā vidē
              </p>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <Button href="/register" size="lg" className="font-medium uppercase" withArrow>
                Reģistrēties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MEMBERSHIP_OPTIONS = [
  {
    id: 'day',
    label: '24 stundas',
    price: '€10.00',
    description: 'Ideāli, lai izmēģinātu lielo zāli vienu vai divas reizes',
    icon: false,
  },
  {
    id: 'month',
    label: 'Mēnesis',
    price: '€59.00',
    description: 'Mēneša abonements neierobežotam apmeklējumam',
    icon: true,
  },
];

const PRIVATE_OPTIONS = [
  {
    id: 'day',
    label: 'Cena par stundu',
    price: '€15.00',
    description: 'Izbaudi netraucētu treniņu vidi',
    icon: true,
  },
];

const Landing = () => {
  const publicGymImages = [
    {
      src: '/carousel/public-gym/liela-landscape-2.jpg',
      alt: 'Slide 2',
      width: 1075,
      height: 717,
    },
    {
      src: '/carousel/public-gym/liela-landscape-6.jpg',
      alt: 'Slide 6',
      width: 1075,
      height: 717,
    },
    {
      src: '/carousel/public-gym/liela-landscape-1.jpg',
      alt: 'Slide 1',
      width: 1075,
      height: 717,
    },
    {
      src: '/carousel/public-gym/liela-landscape-3.jpg',
      alt: 'Slide 3',
      width: 1075,
      height: 717,
    },
    {
      src: '/carousel/public-gym/liela-landscape-4.jpg',
      alt: 'Slide 4',
      width: 1075,
      height: 717,
    },
    {
      src: '/carousel/public-gym/liela-landscape-5.jpg',
      alt: 'Slide 5',
      width: 1075,
      height: 717,
    },
  ];

  const privateGymImages = [
    {
      src: '/carousel/private-gym/privata-landscape-1.jpg',
      alt: 'Slide 1',
      width: 1075,
      height: 717,
    },
    {
      src: '/carousel/private-gym/privata-landscape-2.jpg',
      alt: 'Slide 2',
      width: 1075,
      height: 717,
    },
    {
      src: '/carousel/private-gym/privata-landscape-3.jpg',
      alt: 'Slide 3',
      width: 1075,
      height: 717,
    },
    {
      src: '/carousel/private-gym/privata-landscape-4.jpg',
      alt: 'Slide 4',
      width: 1075,
      height: 717,
    },
  ];

  const privateFeatures = [
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
  ];

  const mainFeatures = [
    {
      icon: <LuSun className="text-3xl text-accent" />,
      title: 'Plašas un gaišas telpas',
    },
    {
      icon: <LuSmile className="text-3xl text-accent" />,
      title: 'Iedvesmojoša sporta kopiena',
    },
    {
      icon: <MdOutlineAutoAwesome className="text-3xl text-accent" />,
      title: 'Moderns inventārs',
    },
  ];

  return (
    <main className="flex w-full flex-col justify-center">
      <HeroSection />
      <section
        id="main"
        className="flex flex-col items-center justify-center gap-6 pt-16 md:min-h-screen md:gap-16"
      >
        <div className="flex flex-col items-center justify-center gap-2 px-5 text-center">
          <h2 className="bakbak text-3xl font-semibold md:text-5xl">Lielā zāle</h2>
          <p className="max-w-2xl font-extralight md:text-xl">
            Gaišas un plašas telpas, veidotas{' '}
            <span className="font-light">ar godalgotu olimpisko pieredzi</span> un{' '}
            <span className="font-light">aprīkotas ar moderniem trenažieriem</span>, ļaus sasniegt
            mērķus <span className="font-light">ērtāk un ātrāk</span>
          </p>
        </div>
        <Carousel
          width="100%"
          mode="snap"
          perView={useResponsiveValue({
            minValue: 1.1,
            maxValue: 2.2,
            minWidth: 320,
            maxWidth: 1280,
          })}
        >
          {publicGymImages.map((image, index) => (
            <Image
              className="aspect-square object-cover md:aspect-auto"
              key={index}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          ))}
        </Carousel>
        <div className="flex flex-col items-center justify-center gap-6 px-5 text-center font-extralight">
          <ul className="flex flex-col items-center justify-center md:flex-row">
            {mainFeatures.map((feature, index) => (
              <li
                key={index}
                className={`${index < mainFeatures.length - 1 ? 'border-b md:border-none' : ''} flex items-center justify-center gap-3 border-transparent p-3 font-light`}
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
          <div className="flex flex-col items-center justify-center gap-2">
            <Button href="/register" size="lg" className="font-medium uppercase" withArrow>
              Reģistrēties
            </Button>
          </div>
        </div>
      </section>

      <section
        id="private"
        className="flex flex-col items-center justify-center gap-6 pt-16 md:min-h-screen md:gap-8"
      >
        <div className="flex flex-col items-center justify-center gap-2 px-5 text-center">
          <h2 className="bakbak text-3xl font-semibold md:text-5xl">Privātā zāle</h2>
          <p className="font-extralight md:text-xl">
            Gūsti ekskluzīvu treniņu pieredzi netraucētā vidē, sasniedzot rezultātu ātrāk.
          </p>
        </div>
        <Carousel
          width="100%"
          mode="snap"
          perView={useResponsiveValue({
            minValue: 1.1,
            maxValue: 2.2,
            minWidth: 320,
            maxWidth: 1280,
          })}
        >
          {privateGymImages.map((image, index) => (
            <Image
              className="aspect-square object-cover md:aspect-auto"
              key={index}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          ))}
        </Carousel>
        <div className="flex flex-col items-center justify-center gap-6 px-5 text-center font-extralight">
          <ul className="flex flex-col items-center justify-center md:flex-row">
            {privateFeatures.map((feature, index) => (
              <li
                key={index}
                className={`${index < privateFeatures.length - 1 ? 'border-b md:border-none' : ''} flex items-center justify-center gap-3 border-transparent p-3 font-light`}
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
          <div className="flex flex-col items-center justify-center gap-2">
            <Button href="/register" size="lg" className="font-medium uppercase" withArrow>
              Reģistrēties
            </Button>
          </div>
        </div>
      </section>

      <section id="digital" className="pt-16">
        <div className="flex flex-col items-center justify-center gap-2 px-5 text-center">
          <h2 className="bakbak text-3xl font-semibold md:text-5xl">Digitāla platforma</h2>
          <p className="max-w-2xl font-extralight md:text-xl">
            Pārvaldi abonementu un rezervē Privāto zāli
          </p>
        </div>
        <div className="mx-auto flex max-w-xl flex-row items-center justify-center gap-6 p-6">
          <div className="overflow-hidden rounded-3xl border-4 border-alternate">
            <Image
              src="/digital/digital-2.png"
              quality={100}
              alt="Sporta klubs Ozols Digital"
              width={732}
              height={1554}
              className="object-cover"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-3xl border-4 border-alternate">
            <Image
              src="/digital/digital-1.png"
              quality={100}
              alt="Sporta klubs Ozols Digital"
              width={732}
              height={1554}
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Button href="/register" size="lg" className="font-medium uppercase" withArrow>
            Reģistrēties
          </Button>
        </div>
      </section>

      <section id="coaches" className="pt-16">
        <div className="flex flex-col items-center justify-center gap-2 px-5 text-center">
          <h2 className="bakbak text-3xl font-semibold md:text-5xl">
            Tev pielāgots ceļš uz rezultātu
          </h2>
          <p className="max-w-2xl font-extralight md:text-xl">
            Satiec mūsu trenerus un atrod sev piemērotāko ceļu uz mērķiem
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 px-4 sm:grid-cols-2">
          <Coach
            phone="+37126089445"
            size="default"
            name="Iveta Jansone"
            title="Apļa un personalizētie spēka treniņi"
            image="iveta.jpg"
            quote="Mana galvenā misija ir radīt vidi, kurā ikviens justos piederīgs, neatkarīgi no vecuma, dzimuma vai citiem faktoriem, tādējādi veicinot fizisko un mentālo veselību sabiedrībā"
            specialties={['Personalizēti spēka treniņi', 'Apļa treniņi', 'Privāti treniņi']}
          />
          <Coach
            phone="+37129241681"
            size="default"
            name="Jānis Ozols"
            title="Vispārīgā fiziskā sagatavotība"
            image="janis.jpg"
            quote="Tiecos enerģiski un motivējoši palīdzēt sasniegt Jūsu mērķus, vienlaikus veicinot ilgstošu mīlestību pret aktīvu dzīvesveidu"
            specialties={[
              'Fitness un bodibildings',
              'Spēka treniņi',
              'Svara samazināšana',
              'Treniņi ar savu ķermeņa svaru',
              'Treniņi iesācējiem',
            ]}
          />
        </div>
      </section>

      <section id="pricing" className="flex flex-col items-center justify-center pt-16">
        <div className="flex flex-col items-center justify-center gap-2 px-5 text-center">
          <p className="bakbak text-2xl md:text-3xl">Cenas</p>
          <h2 className="bakbak text-3xl font-semibold tracking-wide md:text-5xl">
            Vienkārši. Elastīgi. Pieejami.
          </h2>
        </div>

        <div className="flex w-full max-w-5xl flex-col items-start justify-center md:flex-row md:gap-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4">
            <span className="relative top-5 bg-background p-2 font-light uppercase text-accent md:text-xl">
              Lielā zāle
            </span>
            <div className="mx-auto flex w-full max-w-lg flex-col gap-3.5 rounded-2xl border border-accent p-4 md:justify-center">
              {MEMBERSHIP_OPTIONS.map((option) => (
                <Container
                  key={option.id}
                  className={`w-full border-[1px] border-alternate px-3.5 py-3 transition-all md:max-w-lg`}
                >
                  <div className="absolute right-3.5 top-3"></div>
                  <div className="text-sm font-medium text-white">{option.label}</div>
                  <div className="mb-1 font-light text-white">{option.price}</div>
                  <div className="flex items-center text-xs">
                    {option.icon ? (
                      <>
                        {option.id === 'month' ? (
                          <TiStarOutline className="mr-1 text-sm text-accent" />
                        ) : (
                          <TbCoinEuro className="mr-1 text-sm text-accent" />
                        )}
                        <span className="text-alternate">{option.description}</span>
                      </>
                    ) : (
                      <span className="text-alternate">{option.description}</span>
                    )}
                  </div>
                </Container>
              ))}
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4">
            <span className="relative top-5 bg-background p-2 font-light uppercase text-accent md:text-xl">
              Privātā zāle
            </span>
            <div className="mx-auto flex w-full max-w-lg flex-col gap-3.5 rounded-2xl border border-accent p-4 md:justify-center">
              {PRIVATE_OPTIONS.map((option) => (
                <Container
                  key={option.id}
                  className={`w-full flex-grow border-[1px] border-alternate px-3.5 py-3 transition-all md:max-w-lg`}
                >
                  <div className="text-sm font-medium text-white">{option.label}</div>
                  <div className="mb-1 font-light text-white">{option.price}</div>
                  <div className="flex items-center text-xs">
                    {option.icon ? (
                      <>
                        <TiStarOutline className="mr-1 text-sm text-accent" />
                        <span className="text-alternate">{option.description}</span>
                      </>
                    ) : (
                      <span className="text-alternate">{option.description}</span>
                    )}
                  </div>
                </Container>
              ))}
            </div>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-lg px-4 text-center font-extralight text-white md:max-w-xl">
          Lielās zāles abonements ar 40% atlaidi pieejams{' '}
          <span className="font-medium">
            skolēniem, studentiem līdz 25 gadu vecumam un pensionāriem
          </span>
        </p>
        <p className="mx-auto mt-4 max-w-md px-4 text-center text-sm font-extralight text-white">
          Reģistrējies un{' '}
          <Link href="/contact" className="underline">
            sazinies ar mums
          </Link>
          , lai saņemtu šo piedāvājumu!
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          <Button href="/register" size="lg" className="font-medium uppercase" withArrow>
            Reģistrēties
          </Button>
        </div>
      </section>

      <footer className="relative z-10 flex flex-col items-center justify-center gap-16 pb-8 pt-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-evenly gap-10 text-alternate md:flex-row">
          <div className="flex w-1/3 items-center justify-center">
            <Link href="/log-in">
              <Button size="sm" variant="outline" className="px-12 font-medium uppercase">
                Ienākt
              </Button>
            </Link>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center gap-3 text-center">
            <Link
              href="/contact"
              className="relative z-20 cursor-pointer transition-all duration-200 hover:cursor-pointer hover:underline"
            >
              Kontakti
            </Link>
            <Link
              href="/tc"
              className="relative z-20 cursor-pointer transition-all duration-200 hover:cursor-pointer hover:underline"
            >
              Noteikumi
            </Link>
            <Link
              href="/pp"
              className="relative z-20 cursor-pointer transition-all duration-200 hover:cursor-pointer hover:underline"
            >
              Privātuma politika
            </Link>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center gap-3 text-alternate">
            <div className="flex items-center justify-center gap-6 text-2xl text-accent">
              <Link
                href={'https://www.instagram.com/ozols_club'}
                className="relative z-20 cursor-pointer transition-all duration-200 hover:scale-110 hover:cursor-pointer"
              >
                <FaInstagram />
              </Link>
              <Link
                href={'https://www.facebook.com/ozols.club'}
                className="relative z-20 cursor-pointer transition-all duration-200 hover:scale-110 hover:cursor-pointer"
              >
                <FaFacebook />
              </Link>
              <Link
                href={'https://www.tiktok.com/@ozols_club'}
                className="relative z-20 cursor-pointer transition-all duration-200 hover:scale-110 hover:cursor-pointer"
              >
                <FaTiktok />
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto flex flex-col items-center justify-evenly gap-6">
          <div className="flex items-center justify-center gap-20 opacity-60">
            <Image
              src="/project_logos/les.png"
              alt="LES Logo"
              width={80}
              height={80}
              className="h-auto max-h-16 w-auto object-contain"
            />
            <Image
              src="/project_logos/nap.png"
              alt="NAP Logo"
              width={80}
              height={80}
              className="h-auto max-h-16 w-auto object-contain invert"
            />
            <Image
              src="/project_logos/plj.png"
              alt="PLJ Logo"
              width={80}
              height={80}
              className="h-auto max-h-16 w-auto object-contain invert"
            />
          </div>
          <Link
            href="https://dezain.studio"
            className="relative z-20 cursor-pointer transition-all duration-200 hover:cursor-pointer hover:opacity-80"
          >
            <Image
              src="/dezain.png"
              alt="Developed by Dezan Studio"
              width={300}
              height={50}
              className="w-full max-w-[200px]"
            />
          </Link>
        </div>
      </footer>
    </main>
  );
};

export default Landing;
