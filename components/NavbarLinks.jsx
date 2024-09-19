import Link from 'next/link';

const NavbarLinks = () => {
  return (
    <>
      <Link href="/book" className="hover:underline hover:underline-offset-4">
        Pieteikties
      </Link>
      <Link href="/about" className="hover:underline hover:underline-offset-4">
        Par mums
      </Link>
      <Link href="/contact" className="hover:underline hover:underline-offset-4">
        Kontakti
      </Link>
    </>
  );
};

export default NavbarLinks;
