'use client';
import { differenceInDays } from 'date-fns';
import { useReservation } from './ReservationContext';
import { createBookingAction } from '../_lib/actions';
import SubmitButton from './SubmitButton';

('');
function ReservationForm({ cabin }: any) {
   // CHANGE
   const { range, resetRange }: any = useReservation();
   const { maxCapacity, regularPrice, discount, cabinId } = cabin;

   const startDate = range.from;
   const endDate = range.to;
   const numNights = differenceInDays(endDate, startDate) + 1;
   const cabinPrice = numNights * (regularPrice - discount);
   const created_at = new Date().toISOString();

   const bookingData = {
      startDate,
      endDate,
      numNights,
      cabinPrice,
      cabinId,
   };
   const createBookingData = createBookingAction.bind(null, bookingData);
   return (
      <div className="scale-[1.01]">
         <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
            <p>Logged in as</p>

            {/* <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div> */}
         </div>

         <form
            // action={createBookingData}
            action={async (formData) => {
               await createBookingData(formData);
               resetRange();
            }}
            className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
         >
            <div className="space-y-2">
               <label htmlFor="numGuests">How many guests?</label>
               {/* hidden inputs */}

               <input type="hidden" name="cabinId" value={cabin.id} />
               <input type="hidden" name="startDate" value={startDate} />
               <input type="hidden" name="endDate" value={endDate} />
               <input type="hidden" name="numNights" value={numNights} />
               <input type="hidden" name="cabinPrice" value={cabinPrice} />
               <input type="hidden" name="created_at" value={created_at} />
               {/* end of hidden inputs */}

               <select
                  name="numGuests"
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
                  name="observations"
                  id="observations"
                  className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                  placeholder="Any pets, allergies, special requirements, etc.?"
               />
            </div>

            <div className="flex justify-end items-center gap-6">
               <p className="text-primary-300 text-base">
                  Start by selecting dates
               </p>

               {startDate && endDate && (
                  <SubmitButton
                     text="Reserve now"
                     pendingStatus="Reserving..."
                  />
               )}
            </div>
         </form>
      </div>
   );
}

export default ReservationForm;
