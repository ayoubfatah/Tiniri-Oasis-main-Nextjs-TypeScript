import { Suspense } from 'react';
import CabinList from '../_components/CabinList';
import Filter from '../_components/Filter';
import Loading from '../loading';
import ReservationReminder from '../_components/ReservationReminder';

type CabinListProps = {
   filter: string;
};

export const revalidate = 3600;
// using 10 SECs for dev
// export const revalidate = 10;

export const metadata = {
   title: 'Cabins',
};

export default async function Page({ searchParams }: any) {
   const filter = searchParams?.capacity ?? 'all';

   return (
      <>
         <ReservationReminder />

         <div>
            <h1 className="text-4xl mb-5 text-accent-400 font-medium">
               Our Luxury Cabins
            </h1>

            <p className="text-primary-200 text-lg mb-10">
               Cozy yet luxurious cabins, located right in the heart of the
               Italian Dolomites. Imagine waking up to beautiful mountain views,
               spending your days exploring the dark forests around, or just
               relaxing in your private hot tub under the stars. Enjoy
               nature&lsquo;s beauty in your own little home away from home. The
               perfect spot for a peaceful, calm vacation. Welcome to paradise.
            </p>
            <div className="flex justify-end mb-5">
               <Filter />
            </div>
            <Suspense fallback={<Loading />} key={filter}>
               <CabinList filter={filter} />
            </Suspense>
         </div>
      </>
   );
}
