import UpdateReservationButton from '@/app/_components/UpdateReservationButton';
import { updateBookingAction } from '@/app/_lib/actions';
import { getBooking, getCabin } from '@/app/_lib/data-service';

type PageParams = {
   bookingId: string;
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
// export async function generateMetadata({ params }: { params: PageParams }) {
//    const session = await auth();
//    const bookings = await getBookings(session?.user?.guestId);
//    console.log(bookings, 'bookings');
//    return { title: `reservation` };
// }

export default async function Page({ params }: { params: PageParams }) {
   // CHANGE

   const { bookingId } = params;
   const { numGuests, observations, cabinId } = await getBooking(bookingId);
   const { maxCapacity } = await getCabin(cabinId);

   return (
      <div>
         <h2 className="font-semibold text-2xl text-accent-400 mb-7">
            Edit Reservation #{bookingId}
         </h2>

         <form
            action={updateBookingAction}
            className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
         >
            <input type="hidden" name="bookingId" value={bookingId} />

            <div className="space-y-2">
               <label htmlFor="numGuests">How many guests?</label>
               <select
                  name="numGuests"
                  defaultValue={numGuests}
                  id="numGuests"
                  className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                  required
               >
                  <option value="" key="">
                     Select number of guests...
                  </option>
                  {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
                     (x) => (
                        <option value={x} key={x}>
                           {x} {x === 1 ? 'guest' : 'guests'}
                        </option>
                     )
                  )}
               </select>
            </div>

            <div className="space-y-2">
               <label htmlFor="observations">
                  Anything we should know about your stay?
               </label>
               <textarea
                  defaultValue={observations}
                  name="observations"
                  className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
               />
            </div>

            <div className="flex justify-end items-center gap-6">
               <UpdateReservationButton />
            </div>
         </form>
      </div>
   );
}
