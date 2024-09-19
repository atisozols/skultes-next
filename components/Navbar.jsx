'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import NavbarLinks from './NavbarLinks';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import CartButton from './CartButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-background p-8 py-3 rounded-full">
      <div className="">
        <div className="flex gap-10 items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 mr-auto">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={220}
                height={107}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Links for larger screens */}
          <div className="font-normal text-white dark:text-foreground text-xl hidden lg:flex space-x-8">
            <NavbarLinks />
          </div>

          <CartButton />

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
        className={`fixed inset-0 z-50 text-lg transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <button onClick={toggleMenu} className="absolute top-14 right-16">
          <HiX className="h-10 w-10 text-white" />
        </button>
        <div className="text-white flex flex-col text-3xl tracking-wider font-semibold justify-center items-center gap-12 h-full bg-background">
          <NavbarLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
