import Header from '@/app/_components/Header';
import React from 'react';

import '@/app/_styles/globals.css';

import { Josefin_Sans } from 'next/font/google';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: object = {
  // title: 'Tiniri_Oasis ',
  title: {
    template: '%s Tiniri Oasis ',
    default: 'Welcome / Tiniri Oasis',
  },
  description:
    'Luxurious cabin hotel located in Morocco Ouarzazate  surrounded by beautiful mountains ',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col `}
      >
        <Header />
        <div className=" flex-1 px-8 py-12  ">
          <main className="max-w-7xl mx-auto ">{children} </main>
        </div>
      </body>
    </html>
  );
}
