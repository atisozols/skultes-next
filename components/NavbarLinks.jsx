import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

const NavbarLinks = () => {
  return (
    <>
      <Link href="/" className="hover:underline hover:underline-offset-4">
        Sākums
      </Link>
      <Link href="/reservations" className="hover:underline hover:underline-offset-4">
        Manas rezervācijas
      </Link>
      <Link href="/book" className="hover:underline hover:underline-offset-4">
        VIP zāle
      </Link>
      <Link href="/about" className="hover:underline hover:underline-offset-4">
        Par mums
      </Link>
      <Link href="/contact" className="hover:underline hover:underline-offset-4">
        Kontakti
      </Link>
      <SignedIn>
        <SignOutButton className="hover:underline hover:underline-offset-4">Iziet</SignOutButton>
      </SignedIn>
      <SignedOut>
        <Link href="/log-in" className="hover:underline hover:underline-offset-4">
          Ienākt
        </Link>
      </SignedOut>
    </>
  );
};

export default NavbarLinks;
