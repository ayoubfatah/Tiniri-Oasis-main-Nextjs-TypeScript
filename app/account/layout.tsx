import React, { ReactNode } from 'react';
import SideNavigation from '../_components/SideNavigation';
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
        <SideNavigation />
        <div>{children}</div>
      </div>
    </>
  );
}
