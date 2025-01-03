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
    <div className="mt-4 w-full px-4">
      <nav className="w-full rounded-full bg-background px-4 py-2.5 shadow-md dark:bg-background">
        <div className="">
          <div className="flex items-center justify-center">
            {/* Logo */}
            <div className="mr-auto flex-shrink-0 pl-2">
              <Link href="/">
                <Image
                  src="/sk_ozols.png"
                  alt="Logo"
                  width={400}
                  height={200}
                  className="h-7 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Links for larger screens */}
            <div className="hidden space-x-8 pr-2 font-normal text-white lg:flex dark:text-foreground">
              <NavbarLinks />
            </div>

            {/* Hamburger Menu Button for smaller screens */}
            <div className="flex items-center justify-center lg:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="rounded-2xl p-1 transition-all hover:bg-white hover:bg-opacity-10"
                aria-expanded="false"
              >
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
          <button
            onClick={toggleMenu}
            className="absolute right-8 top-7 rounded-2xl p-1 transition-all hover:bg-white hover:bg-opacity-10"
          >
            <HiX className="h-10 w-10 text-white" />
          </button>
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-background text-xl font-light tracking-wider text-white">
            <NavbarLinks />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
