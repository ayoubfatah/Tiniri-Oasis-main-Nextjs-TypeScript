'use client';

import { deleteReservationAction } from '../_lib/actions';
import ReservationCard from './ReservationCard';
import { startTransition, useOptimistic } from 'react';

export default function ReservationList({ bookings }: any) {
   const { bookingId } = bookings;

   const [optimisticBookings, optimisticDelete] = useOptimistic(
      bookings,
      (currBookings, bookingId) => {
         return currBookings.filter((booking: any) => booking.id !== bookingId);
      }
   );
   async function handleDelete(bookingId: any) {
      optimisticDelete(bookingId);
      await deleteReservationAction(bookingId);
   }

   return (
      <ul className="space-y-6">
         {optimisticBookings.map((booking: any) => (
            <ReservationCard
               onDelete={handleDelete}
               booking={booking}
               key={booking.id}
            />
         ))}
      </ul>
   );
}
