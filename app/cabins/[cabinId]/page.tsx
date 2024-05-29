import TextExpander from '@/app/_components/TextExpander';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { title } from 'process';

// Define the type for the params
type PageParams = {
   cabinId: string;
};

// Define the type for the cabin object
type Cabin = {
   cabinId: string;
   name: string;
   maxCapacity: number;
   regularPrice: number;
   discount: number;
   image: string;
   description: string;
};

export async function generateStaticParams(): Promise<PageParams[]> {
   const cabins = await getCabins();

   const ids = cabins.map((cab) => ({
      cabinId: String(cab.cabinId),
   }));

   return ids;
}

export async function generateMetadata({ params }: { params: PageParams }) {
   const { name } = await getCabin(params.cabinId);
   return { title: `cabin ${name}` };
}

export default async function Page({ params }: { params: PageParams }) {
   // Fetch the cabin data
   const cabin: Cabin | null = await getCabin(params.cabinId);

   // Handle the case where the cabin is not found
   if (!cabin) {
      return (
         <div className="max-w-6xl mx-auto mt-8 ">
            <h1>Cabin not found</h1>
            <p>The cabin with ID {params.cabinId} could not be found.</p>
         </div>
      );
   }

   const {
      cabinId: id,
      name,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
   } = cabin;

   return (
      <div className="max-w-6xl mx-auto mt-8">
         <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
            <div className="relative scale-[1.15] -translate-x-3">
               <Image fill src={image} alt={`Cabin ${name}`} />
            </div>

            <div>
               <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
                  Cabin {name}
               </h3>

               <p className="text-lg text-primary-300 mb-10">
                  <TextExpander>{description}</TextExpander>
               </p>

               <ul className="flex flex-col gap-4 mb-7">
                  <li className="flex gap-3 items-center">
                     <UsersIcon className="h-5 w-5 text-primary-600" />
                     <span className="text-lg">
                        For up to{' '}
                        <span className="font-bold">{maxCapacity}</span> guests
                     </span>
                  </li>
                  <li className="flex gap-3 items-center">
                     <MapPinIcon className="h-5 w-5 text-primary-600" />
                     <span className="text-lg">
                        Located in the heart of the{' '}
                        <span className="font-bold">Dolomites</span> (Italy)
                     </span>
                  </li>
                  <li className="flex gap-3 items-center">
                     <EyeSlashIcon className="h-5 w-5 text-primary-600" />
                     <span className="text-lg">
                        Privacy <span className="font-bold">100%</span>{' '}
                        guaranteed
                     </span>
                  </li>
               </ul>
            </div>
         </div>

         <div>
            <h2 className="text-5xl font-semibold text-center">
               Reserve today. Pay on arrival.
            </h2>
         </div>
      </div>
   );
}
