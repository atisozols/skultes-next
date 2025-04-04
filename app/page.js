import Cart from '@/components/cart/Cart';
import LastVisit from '@/components/home/LastVisit';
import MakeReservation from '@/components/home/MakeReservation';
import MyReservations from '@/components/home/MyReservations';
import Profile from '@/components/home/Profile';
import dynamic from 'next/dynamic';
const Nav = dynamic(() => import('@/components/ui/Nav'), { ssr: false });
import { SignedOut, SignedIn } from '@clerk/nextjs';

import React from 'react';

const page = () => {
  return (
    <>
      <SignedOut>
        <main className="flex w-full flex-col justify-center gap-8"></main>
      </SignedOut>

      <SignedIn>
        <main className="relative flex w-full max-w-2xl flex-1 flex-col justify-center pb-20 md:py-10">
          <Profile />
          <LastVisit />
          <MyReservations />
          <MakeReservation />
          <Cart />
          <Nav />
        </main>
      </SignedIn>
    </>
  );
};

export default page;
