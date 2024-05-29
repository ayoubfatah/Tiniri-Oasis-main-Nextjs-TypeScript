import React from 'react';
import CabinCard from './CabinCard';
import { getCabins } from '../_lib/data-service';
import { unstable_noStore as noStore } from 'next/cache';

type CabinListProps = {
   filter: string;
};

type FilteredCabins = {
   cabinId: number | string;
   name: string;
   maxCapacity: number;
   regularPrice: number;
   discount: number;
   image: string;
};

export default async function CabinList({ filter }: CabinListProps) {
   //  noStore();
   const cabins: FilteredCabins[] = await getCabins();
   if (!cabins.length) return null;

   let displayCabins: FilteredCabins[] = [];

   if (filter === 'all') {
      displayCabins = cabins;
   } else if (filter === 'small') {
      displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 4);
   } else if (filter === 'medium') {
      displayCabins = cabins.filter(
         (cabin) => cabin.maxCapacity >= 5 && cabin.maxCapacity <= 9
      );
   } else if (filter === 'large') {
      displayCabins = cabins.filter((cabin) => cabin.maxCapacity > 9);
   }

   return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
         {displayCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.cabinId} />
         ))}
      </div>
   );
}
