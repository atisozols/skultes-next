import Image from 'next/image';
import Link from 'next/link';
import TopNav from '@/components/ui/TopNav';
import { FaPhone, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export const metadata = {
  title: 'Kontakti | Skultes Sporta Centrs',
  description: 'Sazinieties ar mums par jautājumiem vai sadarbības iespējām',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <TopNav />

      <div className="container mx-auto px-4 pb-4 pt-24 md:pt-36 lg:pt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 text-sm font-medium uppercase text-alternate">
                  Sazinies ar mums
                </h2>
                <a
                  href="mailto:atis@ozols.club"
                  className="flex items-center gap-2 text-2xl font-light text-foreground"
                >
                  atis@ozols.club
                </a>
              </div>

              <div>
                <h2 className="mb-2 text-sm font-medium uppercase text-alternate">
                  Trenējies pie mums
                </h2>
                <div className="flex flex-col text-2xl font-light text-foreground">
                  <span>Brīvības laukums 4, Tukums</span>
                  <span className="text-sm">ieeja no Harmonijas ielas pagalma pusē</span>
                </div>
              </div>

              <div>
                <h2 className="mb-2 text-sm font-medium uppercase text-alternate">P - SV</h2>
                <div className="flex flex-col text-2xl font-light text-foreground">
                  <span>5:00 - 23:00</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-3 text-alternate">
              <div className="flex items-center justify-center gap-6 text-2xl text-foreground">
                <Link href={'https://www.instagram.com/ozols_club'}>
                  <FaInstagram />
                </Link>
                <Link href={'https://www.facebook.com/ozols.club'}>
                  <FaFacebook />
                </Link>
                <Link href={'https://www.tiktok.com/@ozols_club'}>
                  <FaTiktok />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg md:h-[500px]">
            <Image
              src="/carousel/public-gym/liela-landscape-1.jpg"
              alt="Skultes Sporta Centrs"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
