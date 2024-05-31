'use client';
import Header from '@/app/_components/Header';
import React from 'react';
import '@/app/_styles/globals.css';
import { Josefin_Sans } from 'next/font/google';
import {
   ReservationContext,
   ReservationProvider,
} from './_components/ReservationContext';

type RootLayoutProps = {
   children: React.ReactNode;
};
const josefin = Josefin_Sans({
   subsets: ['latin'],
   display: 'swap',
});
export default function RootLayout({ children }: RootLayoutProps) {
   return (
      <html lang="en">
         <body
            className={`${josefin.className} w-full relative antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col `}
         >
            <Header />

            <div className=" flex-1 px-8 py-12 grid ">
               <main className="max-w-7xl mx-auto w-full">
                  <ReservationProvider>{children} </ReservationProvider>
               </main>
            </div>
         </body>
      </html>
   );
}
