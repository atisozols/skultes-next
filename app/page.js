import Cart from '@/components/cart/Cart';
import LastVisit from '@/components/sections/LastVisit';
import MakeReservation from '@/components/sections/MakeReservation';
import MyReservations from '@/components/sections/MyReservations';
import Profile from '@/components/sections/Profile';
import Membership from '@/components/membership/Membership';
import dynamic from 'next/dynamic';
const Nav = dynamic(() => import('@/components/ui/Nav'), { ssr: false });
import { SignedOut, SignedIn } from '@clerk/nextjs';
import React from 'react';
import Landing from '@/components/sections/Landing';
import Main from '@/components/layout/Main';
import GroupSessions from '@/components/sections/GroupSessions';
import MySessions from '@/components/sections/MySessions';

const page = () => {
  return (
    <>
      <SignedOut>
        <Landing />
      </SignedOut>

      <SignedIn>
        <Main className="justify-start">
          <Profile />
          <Membership />
          <MySessions />
          <MyReservations />
          <GroupSessions />
          <MakeReservation />
          <Cart />
          <Nav />
        </Main>
      </SignedIn>
    </>
  );
};

export default page;
