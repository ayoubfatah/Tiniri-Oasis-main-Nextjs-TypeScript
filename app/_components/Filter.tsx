'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Filter() {
   const searchParams: any = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   const activeFilter = searchParams.get('capacity') ?? 'all';

   function handleFilter(filter: string) {
      const params = new URLSearchParams(searchParams);
      params.set('capacity', filter);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
   }

   return (
      <div className="border-primary-800 flex">
         <Button
            filter={'all'}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
         >
            All Cabins
         </Button>
         <Button
            filter={'small'}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
         >
            1 &mdash; 4 guests
         </Button>
         <Button
            filter={'medium'}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
         >
            5 &mdash; 9 guests{' '}
         </Button>
         <Button
            filter={'large'}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
         >
            10 &mdash; 33 guests
         </Button>
      </div>
   );
}

function Button({ filter, handleFilter, activeFilter, children }: any) {
   return (
      <button
         onClick={() => handleFilter(filter)}
         className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter ? 'bg-primary-700 text-primary-50' : ''}`}
      >
         {children}
      </button>
   );
}
