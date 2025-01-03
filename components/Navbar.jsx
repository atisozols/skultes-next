'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import NavbarLinks from './NavbarLinks';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import Cart from './cart/Cart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full rounded-full bg-background p-7 py-2 shadow-md sm:p-8 sm:py-3">
      <div className="">
        <div className="flex h-16 items-center gap-6">
          {/* Logo */}
          <div className="mr-auto flex-shrink-0 pl-2">
            <Link href="/">
              <Image
                src="/sk_ozols.png"
                alt="Logo"
                width={400}
                height={200}
                className="h-8 w-auto sm:h-10"
                priority
              />
            </Link>
          </div>

          {/* Links for larger screens */}
          <div className="hidden space-x-8 text-lg font-normal text-white lg:flex dark:text-foreground">
            <NavbarLinks />
          </div>

          {/* Hamburger Menu Button for smaller screens */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} type="button" className="h-full" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <HiMenuAlt3 className="h-10 w-10 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transform text-lg transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <button onClick={toggleMenu} className="absolute right-10 top-9">
          <HiX className="h-10 w-10 text-white" />
        </button>
        <div className="flex h-full flex-col items-center justify-center gap-12 bg-background text-3xl font-semibold tracking-wider text-white">
          <NavbarLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
