import { title } from 'process';
import Navigation from './components/Navigation';
import React from 'react';
import Logo from './components/Logo';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: object = {
  title: 'Tiniri  Oasis ',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Logo />
        <Navigation />
        <main>{children}</main>
        <footer className="text-red-200">footer :D</footer>
      </body>
    </html>
  );
}
