'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

// Menu sections for navigation
const MENU_SECTIONS = [
  { id: 'about', label: 'Par mums' },
  { id: 'services', label: 'Pakalpojumi' },
  { id: 'pricing', label: 'Cenas' },
  { id: 'contact', label: 'Kontakti' },
  { id: 'membership', label: 'Pro plāns' },
];

const BLUR_AMOUNT = 16;
const BG_OPACITY = 0.25;

const DesktopNav = () => {
  const router = useRouter();
  const [isFixed, setIsFixed] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const navbarRef = useRef(null);
  const spacerRef = useRef(null);
  const [isTransparent, setIsTransparent] = useState(true);

  const fixedScrollThreshold = 22;
  const transparencyThreshold = 36;
  const initialHeight = 120;
  const fixedHeight = 80;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition <= transparencyThreshold && !isTransparent) {
        setIsTransparent(true);
      } else if (scrollPosition > transparencyThreshold && isTransparent) {
        setIsTransparent(false);
      }

      if (scrollPosition > 16 && !isShrunk) {
        setIsShrunk(true);
      } else if (scrollPosition === 0 && isShrunk) {
        setTimeout(() => {
          setIsShrunk(false);
        }, 150);
      }

      if (scrollPosition >= fixedScrollThreshold && !isFixed) {
        setIsFixed(true);
      } else if (scrollPosition < fixedScrollThreshold && isFixed) {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed, isShrunk, isTransparent]);

  useEffect(() => {
    if (spacerRef.current) {
      spacerRef.current.style.height = isFixed ? `${initialHeight}px` : '0px';
    }
  }, [isFixed]);

  const handleSectionClick = (sectionId) => {
    const isLoginPage = window.location.pathname.includes('/log-in');

    if (isLoginPage) {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/#${sectionId}`);
      }
    }
  };

  const navbarStyles = {
    width: '100%',
    maxWidth: isShrunk ? '968px' : '100%',
    margin: isShrunk ? '0 auto' : '0',
    borderRadius: isShrunk ? '20px' : '0',
    backdropFilter: !isTransparent ? `blur(${BLUR_AMOUNT}px)` : 'none',
    backgroundColor: !isTransparent ? `rgba(0, 0, 0, ${BG_OPACITY})` : '',
    transition:
      'max-width 0.3s ease, margin 0.3s ease, border-radius 0.3s ease, backdrop-filter 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease',
  };

  const containerStyles = {
    height: isFixed ? `${fixedHeight}px` : `${initialHeight}px`,
    paddingTop: isFixed ? `${initialHeight - fixedHeight}px` : '0',
    paddingBottom: isFixed ? `${initialHeight - fixedHeight}px` : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'none',
  };

  const wrapperStyle = {
    position: isFixed ? 'fixed' : 'relative',
    top: 18,
    left: 0,
    right: 0,
    zIndex: 40,
    display: 'flex',
    justifyContent: 'center',
    transition: 'none',
  };

  return (
    <>
      <div ref={spacerRef} />

      <div ref={navbarRef} style={wrapperStyle}>
        <div className="w-full" style={navbarStyles}>
          <div className="container mx-auto px-6" style={containerStyles}>
            <Link href="/" className="flex items-center">
              <Image
                className="h-10 w-auto"
                src="/logo_red.png"
                alt="Ozols Logo"
                width={750}
                height={204}
              />
            </Link>

            <div className="flex items-center space-x-8">
              {MENU_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className="font-light text-foreground transition-colors duration-200 hover:text-accent"
                >
                  {section.label}
                </button>
              ))}
            </div>
            <Button href="/log-in" className="uppercase">
              Pievienoties
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const router = useRouter();
  const navRef = useRef(null);
  const menuAnimationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const progress = Math.min(scrollPosition / 100, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        !event.target.closest('.menu-content-wrapper') &&
        !event.target.closest('.menu-button')
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const handleSectionClick = (sectionId) => {
    setMenuOpen(false);

    const isLoginPage = window.location.pathname.includes('/log-in');

    if (isLoginPage) {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/#${sectionId}`);
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.25,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.15,
      },
    },
  };

  const menuVariants = {
    hidden: {
      height: 0,
      transition: {
        height: { duration: 0.3, delay: 0.1 },
      },
    },
    visible: {
      height: 'calc(100vh - 68px)',
      transition: {
        height: { duration: 0.3, ease: 'easeOut' },
      },
    },
  };

  const getBackdropStyles = () => {
    const blurValue = menuOpen ? BLUR_AMOUNT : Math.floor(scrollProgress * BLUR_AMOUNT);
    const opacityValue = menuOpen ? BG_OPACITY : scrollProgress * BG_OPACITY;

    return {
      backdropFilter: `blur(${blurValue}px)`,
      backgroundColor: `rgba(0, 0, 0, ${opacityValue})`,
    };
  };

  const backdropStyles = getBackdropStyles();

  return (
    <>
      <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 transform">
        <Image
          className="h-10 w-auto"
          src="/logo_red.png"
          alt="Ozols Logo"
          width={750}
          height={204}
        />
      </div>

      <div
        className="fixed left-0 right-0 top-0 z-40 flex flex-col transition-all duration-300"
        style={backdropStyles}
      >
        <nav ref={navRef} className="z-50 flex items-center justify-between px-5 py-4">
          <Link href="/log-in">
            <FiUser className="text-3xl text-accent" />
          </Link>
          <div className="invisible h-10 w-10"></div>
          <button
            className="menu-button relative z-50 h-8 w-8 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="absolute right-[90%] top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                className={`absolute block h-0.5 w-6 transform bg-accent transition duration-300 ease-in-out ${
                  menuOpen ? 'rotate-45' : '-translate-y-2'
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-6 bg-accent transition-opacity duration-300 ease-in-out ${
                  menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-6 transform bg-accent transition duration-300 ease-in-out ${
                  menuOpen ? '-rotate-45' : 'translate-y-2'
                }`}
              ></span>
            </div>
          </button>
        </nav>

        <div
          className="pointer-events-none fixed inset-x-0 top-[68px] flex items-center justify-center"
          style={{ height: 'calc(100vh - 68px)' }}
        >
          <AnimatePresence mode="wait">
            {menuOpen && (
              <motion.div
                className="pointer-events-auto flex w-full flex-col items-start gap-1 p-4"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {MENU_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className="w-full rounded-lg px-4 py-3 text-left text-2xl font-light text-foreground transition-colors duration-200 hover:bg-white/10"
                  >
                    {section.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {menuOpen && (
            <motion.div
              className="menu-content-wrapper overflow-hidden"
              ref={menuAnimationRef}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const TopNav = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1124);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    setHasMounted(true);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!hasMounted) {
    // Optionally, render a skeleton or nothing while mounting
    return null;
  }

  return isDesktop ? <DesktopNav /> : <MobileNav />;
};

export default TopNav;
