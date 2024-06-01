import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';
import GoogleProvider from 'next-auth/providers/google'; //we import the provider that we want

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
   },
};
export const {
   auth,
   handlers: { GET, POST },
} = NextAuth(autConfig);
