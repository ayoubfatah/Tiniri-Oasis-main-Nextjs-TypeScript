/* eslint-disable quotes */

import bg from '@/public/bg.png';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: object = {
   // title: 'Tiniri_Oasis ',
   title: {
      template: '%s Tiniri Oasis ',
      default: 'Welcome / Tiniri Oasis',
   },
   description:
      'Luxurious cabin hotel located in Morocco Ouarzazate  surrounded by beautiful mountains ',
};
export default function Page() {
   return (
      <main className="mt-[200px] ">
         <Image
            fill
            className="object-cover object-top"
            placeholder="blur"
            loading="lazy"
            quality={50}
            src={bg}
            alt="Mountains and forests with two cabins"
         />

         <div className="relative z-10 text-center">
            <h1 className="animate-fade text-8xl text-primary-50 mb-10 tracking-tight font-normal">
               Welcome to paradise.
            </h1>
            <Link
               href="/cabins"
               className="animate-fade bg-white px-8 py-6 text-black text-lg font-semibold  cursor-pointer hover:text-white   hover:bg-black duration-500 transition-all"
            >
               Explore luxury cabins
            </Link>
         </div>
      </main>
   );
}
