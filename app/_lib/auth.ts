import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';
import GoogleProvider from 'next-auth/providers/google'; //we import the provider that we want
import { createGuest, getGuest } from './data-service';

const autConfig = {
   providers: [
      google({
         clientId: process.env.AUTH_GOOGLE_ID,
         clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
   ],
   callbacks: {
      authorized({ auth, request }: any) {
         return !!auth?.user;
      },
      async signIn({ user, account, profile }: any) {
         try {
            // checking if the guest exist
            const existingGuest = await getGuest(user.email);

            if (!existingGuest) {
               await createGuest({ email: user.email, fullName: user.name });
            }
            return true;
         } catch (error) {
            return false;
         }
      },
      async session({ session, user }: any) {
         const guest = await getGuest(session.user.email);
         session.user.guestId = guest.id;
         return session;
      },
   },
   pages: { signIn: '/login' },
};
export const {
   auth,
   signIn,
   signOut,
   handlers: { GET, POST },
} = NextAuth(autConfig);
