'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { updateGuest } from './data-service';
import { supabase } from './supabase';

export async function signInAction() {
   await signIn('google', { redirectTo: '/account' });
}
export async function signOutAction() {
   await signOut({ redirectTo: '/' });
}

export async function updateGuestAction(formData: any) {
   const session = await auth();
   console.log(session);
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
