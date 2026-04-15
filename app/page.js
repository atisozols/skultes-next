import Cart from '@/components/cart/Cart';
import MakeReservation from '@/components/sections/MakeReservation';
import MyReservations from '@/components/sections/MyReservations';
import Profile from '@/components/sections/Profile';
import Membership from '@/components/sections/Membership';
import dynamic from 'next/dynamic';
import { SignedOut, SignedIn } from '@clerk/nextjs';
import React from 'react';
import Landing from '@/components/sections/Landing';
import Main from '@/components/layout/Main';
import GroupSessions from '@/components/sections/GroupSessions';
import MySessions from '@/components/sections/MySessions';
import Coaches from '@/components/sections/Coaches';
import FAQ from '@/components/sections/FAQ';
import Section from '@/components/ui/Section';
import VerificationCards from '@/components/ui/VerificationCards';
import FadeSection from '@/components/ui/FadeSection';

const Nav = dynamic(() => import('@/components/ui/Nav'), { ssr: false });
const AnimatedContent = dynamic(() => import('@/components/ui/AnimatedContent'), { ssr: false });

const page = () => {
  return (
    <>
      <SignedOut>
        <Landing />
      </SignedOut>

      <SignedIn>
        <AnimatedContent>
          <Main className="justify-start">
            <FadeSection>
              <Profile />
            </FadeSection>
            <FadeSection delay={0.05}>
              <VerificationCards />
            </FadeSection>
            <FadeSection delay={0.1}>
              <Membership />
            </FadeSection>
            <FadeSection>
              <MySessions />
            </FadeSection>
            <FadeSection>
              <MyReservations />
            </FadeSection>
            <FadeSection>
              <GroupSessions />
            </FadeSection>
            <FadeSection>
              <MakeReservation />
            </FadeSection>
            <FadeSection>
              <Cart />
            </FadeSection>
            <FadeSection>
              <Coaches />
            </FadeSection>
            <FadeSection>
              <Section
                title={<span className="flex items-center text-lg">Biežāk uzdotie jautājumi</span>}
              >
                <FAQ />
              </Section>
            </FadeSection>
            <Nav />
          </Main>
        </AnimatedContent>
      </SignedIn>
    </>
  );
};

export default page;
