import Cart from '@/components/cart/Cart';
import LastVisit from '@/components/home/LastVisit';
import MakeReservation from '@/components/home/MakeReservation';
import MyReservations from '@/components/home/MyReservations';
import Profile from '@/components/home/Profile';
import Membership from '@/components/membership/Membership';
import dynamic from 'next/dynamic';
const Nav = dynamic(() => import('@/components/ui/Nav'), { ssr: false });
import { SignedOut, SignedIn } from '@clerk/nextjs';
import React from 'react';
import Landing from '@/components/home/Landing';
import Main from '@/components/layout/Main';

const page = () => {
  return (
    <>
      <SignedOut>
        <Landing />
      </SignedOut>

      <SignedIn>
        <Main className="justify-start">
          <Profile />
          <LastVisit />
          <Membership />
          <MyReservations />
          <MakeReservation />
          <Cart />
          <Nav />
        </Main>
      </SignedIn>
    </>
  );
};

export default page;
