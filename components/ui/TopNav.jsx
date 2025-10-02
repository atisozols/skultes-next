'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { MdPerson } from 'react-icons/md';

// Menu sections for navigation
const MENU_SECTIONS = [
  { id: 'main', label: 'Lielā zāle' },
  { id: 'private', label: 'Privātā zāle' },
  { id: 'digital', label: 'Digitāla platforma' },
  { id: 'coaches', label: 'Treneri' },
  { id: 'pricing', label: 'Cenas' },
  { id: 'faq', label: 'BUJ' },
];

const BLUR_AMOUNT = 16;
const BG_OPACITY = 0.6;
const MAX_RADIUS = 16;

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
            <Button href="/log-in" className="font-medium uppercase">
              <MdPerson className="mr-0.5 text-xl" />
              Ienākt
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
  const prevMenuOpenRef = useRef(false);
  const [isClosing, setIsClosing] = useState(false);
  const [menuCollapseDone, setMenuCollapseDone] = useState(true);
  const closingTimerRef = useRef(null);
  const [contentExitDone, setContentExitDone] = useState(true);

  const handleMenuClick = () => {
    if (!menuOpen) {
      setMenuOpen(true);
    } else {
      setIsClosing(true);
      setMenuOpen(false);
    }
  };

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
        handleMenuClick();
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

  // Detect opening/closing to orchestrate reverse sequence precisely
  useEffect(() => {
    if (!prevMenuOpenRef.current && menuOpen) {
      // Opening: reset collapse flag
      setMenuCollapseDone(false);
    }
    if (prevMenuOpenRef.current && !menuOpen) {
      // Start closing phase; will end on exit complete
      setIsClosing(true);
      setMenuCollapseDone(false);
      setContentExitDone(false);
    }
    prevMenuOpenRef.current = menuOpen;
  }, [menuOpen]);

  // End closing phase once collapse animation reports done
  useEffect(() => {
    if (isClosing && menuCollapseDone) {
      // wait for nav rounding/margins to animate after collapse
      if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
      closingTimerRef.current = setTimeout(() => {
        setIsClosing(false);
      }, 25);
    }
    return () => {
      if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
    };
  }, [isClosing, menuCollapseDone]);

  const handleSectionClick = (sectionId) => {
    handleMenuClick();

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
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'calc(100vh - 68px)', opacity: 1 },
  };

  const getBackdropStyles = (p) => {
    const blurValue = BLUR_AMOUNT * p;

    return {
      backdropFilter: `blur(${blurValue}px)`,
    };
  };

  const scrollP = scrollProgress;
  const blurProgress = menuOpen || (isClosing && (!menuCollapseDone || !contentExitDone)) ? 1 : scrollP;
  const backdropStyles = getBackdropStyles(blurProgress);
  const overlayOpacityTarget = menuOpen || (isClosing && (!menuCollapseDone || !contentExitDone))
    ? BG_OPACITY
    : BG_OPACITY * scrollP;

  // Transition sequencing
  const openTransition = {
    top: { duration: 0.18, ease: 'easeInOut', delay: 0 },
    left: { duration: 0.18, ease: 'easeInOut', delay: 0 },
    right: { duration: 0.18, ease: 'easeInOut', delay: 0 },
    borderRadius: { duration: 0.18, ease: 'easeInOut', delay: 0 },
  };
  const closingTransition = {
    top: { duration: 0.18, ease: 'easeInOut', delay: 0 },
    left: { duration: 0.18, ease: 'easeInOut', delay: 0 },
    right: { duration: 0.18, ease: 'easeInOut', delay: 0 },
    borderRadius: { duration: 0.18, ease: 'easeInOut', delay: 0 },
  };
  const scrollTransition = {
    top: { duration: 0.15, ease: 'easeOut', delay: 0 },
    left: { duration: 0.15, ease: 'easeOut', delay: 0 },
    right: { duration: 0.15, ease: 'easeOut', delay: 0 },
    borderRadius: { duration: 0.15, ease: 'easeOut', delay: 0 },
  };
  const navTransition = menuOpen
    ? openTransition
    : isClosing
      ? closingTransition
      : scrollTransition;

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-40 flex flex-col overflow-hidden"
        style={{ ...backdropStyles, willChange: 'border-radius, top, left, right' }}
        animate={{
          top: menuOpen || (isClosing && !menuCollapseDone) ? 0 : 12 * scrollP,
          left: menuOpen || (isClosing && !menuCollapseDone) ? 0 : 12 * scrollP,
          right: menuOpen || (isClosing && !menuCollapseDone) ? 0 : 12 * scrollP,
          borderRadius: menuOpen || (isClosing && !menuCollapseDone) ? 0 : MAX_RADIUS * scrollP,
        }}
        transition={navTransition}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={false}
          animate={{ opacity: overlayOpacityTarget }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ backgroundColor: 'rgba(0,0,0,1)', borderRadius: 'inherit' }}
        />
        <nav ref={navRef} className="relative z-50 flex h-[68px] items-center justify-between px-5">
          <Link href="/log-in">
            <MdPerson className="text-3xl leading-none text-accent" />
          </Link>
          <div
            onClick={() => document.getElementById('hero').scrollIntoView()}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="pointer-events-none"
              animate={{ scale: menuOpen ? 1 : 1 - 0.1 * scrollP }}
              transition={{ duration: isClosing ? 0.2 : 0.2, delay: isClosing ? 0.25 : 0 }}
            >
              <Image
                className="block h-10 w-auto"
                src="/logo_red.png"
                alt="Ozols Logo"
                width={750}
                height={204}
              />
            </motion.div>
          </div>
          <button
            className="menu-button relative z-50 h-8 w-8 focus:outline-none"
            onClick={() => handleMenuClick()}
          >
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-6 w-6">
                <div className="absolute inset-0">
                  <span
                    className={`absolute left-1/2 top-1/2 block h-0.5 w-6 origin-center -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full bg-accent transition-all duration-200 ease-out ${
                      menuOpen ? 'w-5 translate-y-0 rotate-45' : 'w-6 -translate-y-[7px]'
                    }`}
                  ></span>
                  <span
                    className={`absolute left-1/2 top-[13px] block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-opacity duration-200 ease-out ${
                      menuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span
                    className={`absolute left-1/2 top-1/2 block h-0.5 w-6 origin-center -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full bg-accent transition-all duration-200 ease-out ${
                      menuOpen ? 'w-5 translate-y-0 -rotate-45' : 'w-6 translate-y-[7px]'
                    }`}
                  ></span>
                </div>
              </div>
            </div>
          </button>
        </nav>

        <div
          className="pointer-events-none fixed inset-x-0 top-[68px] flex items-center justify-center"
          style={{ height: 'calc(100vh - 68px)' }}
        >
          <AnimatePresence mode="wait" onExitComplete={() => setContentExitDone(true)}>
            {menuOpen && (
              <motion.div
                className="pointer-events-auto flex w-full flex-col items-start gap-1 p-4"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{
                  duration: 0.2,
                  delay: isClosing ? 0 : 0.2,
                }}
              >
                {MENU_SECTIONS.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className="w-full rounded-lg px-4 py-3 text-left text-2xl font-light text-foreground transition-colors duration-200 hover:bg-white/10"
                  >
                    {section.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait" onExitComplete={() => setMenuCollapseDone(true)}>
          {menuOpen && (
            <motion.div
              className="menu-content-wrapper overflow-hidden"
              ref={menuAnimationRef}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{
                height: { duration: 0.2, ease: 'easeOut', delay: 0.1 },
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const TopNav = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
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
