import { title } from 'process';
import { auth } from '../_lib/auth';

export const metadata = { title: 'Profile' };

export default async function Page() {
   const session: any = await auth();
   console.log(session, 'skk');
   const [firstName] = session.user.name.split(' ');

   return (
      <div>
         <h1>welcome back {firstName}</h1>
      </div>
   );
}
