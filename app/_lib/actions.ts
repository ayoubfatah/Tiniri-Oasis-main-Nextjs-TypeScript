'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from './auth';
import { getBookings } from './data-service';
import { supabase } from './supabase';
import { clear } from 'console';

export async function signInAction() {
   await signIn('google', { redirectTo: '/account' });
}
export async function signOutAction() {
   await signOut({ redirectTo: '/' });
}

export async function updateGuestAction(formData: any) {
   const session = await auth();

   if (!session) throw new Error('Not authorized');
   const NationalID = formData.get('NationalID');
   const nationality = formData.get('nationality');
   if (!/^[a-zA-Z0-9]{6,20}$/.test(NationalID))
      throw new Error('type a valid  national id');

   const updatedGuest = {
      NationalID,
      nationality,
   };

   const { data, error } = await supabase
      .from('guests')
      .update(updatedGuest)
      .eq('id', session.user.guestId);

   if (error) throw new Error('Guest could not be updated');
   revalidatePath('/account/profile');
}

export async function deleteReservationAction(bookingId: string | number) {
   const session = await auth();

   if (!session) throw new Error('Not authorized');
   const guestBookings = await getBookings(session.user.guestId);
   const guestBookingsIds = guestBookings.map((booking: any) => booking.id);
   if (bookingId && !guestBookingsIds.includes(bookingId))
      throw new Error('Booking not found');

   const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);

   if (error) throw new Error('Booking could not be deleted');

   revalidatePath('/account/reservations');
}

export async function updateBookingAction(formData: any) {
   // 1 - authorization
   const session = await auth();
   const bookingId = +formData.get('bookingId');

   if (!session) throw new Error('Not authorized');
   const guestBookings = await getBookings(session.user.guestId);
   const guestBookingsIds = guestBookings.map((booking: any) => booking.id);
   if (bookingId && !guestBookingsIds.includes(bookingId))
      throw new Error('cant be  updated');
   // building updateddata
   const updatedData = {
      numGuests: +formData.get('numGuests'),
      observations: formData.get('observations').slice(0, 500),
   };

   // mutation to supabase
   const { data, error } = await supabase
      .from('bookings')
      .update(updatedData)
      .eq('id', bookingId)
      .select()
      .single();

   if (error) {
      console.error(error);
      throw new Error('Booking could not be updated');
   }
   // revalidation

   revalidatePath(`/account/reservations/edit/${bookingId}`);
   revalidatePath(`/account/reservations`);

   // redirect
   redirect('/account/reservations');
}
