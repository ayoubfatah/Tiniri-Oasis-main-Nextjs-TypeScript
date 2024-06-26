/* eslint-disable react/no-unescaped-entities */
import about1 from '@/public/about-1.jpg';
import about2 from '@/public/about-2.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { getCabins } from '../_lib/data-service';

export const metadata: object = {
   title: 'about ',
};

export const revalidate = 864000;

export default async function Page() {
   const cabins: any[] = await getCabins();
   const allCabins = cabins.length;

   return (
      <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
         <div className="col-span-3">
            <h1 className="text-4xl mb-10 text-accent-400 font-medium">
               Welcome to The Wild Oasis
            </h1>

            <div className="space-y-8">
               <p>
                  Where nature's beauty and comfortable living blend seamlessly.
                  Hidden away in the heart of the Italian Dolomites, this is
                  your paradise away from home. But it's not just about the
                  luxury cabins. It's about the experience of reconnecting with
                  nature and enjoying simple pleasures with family.
               </p>
               <p>
                  Our <span className="font-bold">{allCabins}</span> luxury
                  cabins provide a cozy base, but the real freedom and peace
                  you'll find in the surrounding mountains. Wander through lush
                  forests, breathe in the fresh air, and watch the stars twinkle
                  above from the warmth of a campfire or your hot tub.
               </p>
               <p>
                  This is where memorable moments are made, surrounded by
                  nature's splendor. It's a place to slow down, relax, and feel
                  the joy of being together in a beautiful setting.
               </p>
            </div>
         </div>

         <div className="relative  aspect-square col-span-2">
            <Image
               quality={70}
               src="/about-1.jpg"
               fill
               className="object-cover "
               alt="Family sitting around a fire pit in front of cabin"
            />
         </div>

         <div className="relative col-span-2 aspect-square ">
            <Image
               quality={70}
               src="/about-2.jpg"
               fill
               className="object-cover"
               alt="Family that manages The Wild Oasis"
            />
         </div>

         <div className="col-span-3">
            <h1 className="text-4xl mb-10 text-accent-400 font-medium">
               Managed by our family since 1962
            </h1>

            <div className="space-y-8">
               <p>
                  Since 1962, The Wild Oasis has been a cherished family-run
                  retreat. Started by our grandparents, this haven has been
                  nurtured with love and care, passing down through our family
                  as a testament to our dedication to creating a warm, welcoming
                  environment.
               </p>
               <p>
                  Over the years, we've maintained the essence of The Wild
                  Oasis, blending the timeless beauty of the mountains with the
                  personal touch only a family business can offer. Here, you're
                  not just a guest; you're part of our extended family. So join
                  us at The Wild Oasis soon, where tradition meets tranquility,
                  and every visit is like coming home.
               </p>

               <div>
                  <Link
                     href="/cabins"
                     className="animate-fade bg-white px-8 py-6 text-black text-lg font-semibold  cursor-pointer hover:text-white   hover:bg-black duration-500 transition-all"
                  >
                     Explore luxury cabins
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
