import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';
type Params = {
   cabinId: string;
};
export async function GET(request: any, { params }: any) {
   const { cabinId } = params;
   console.log('ssss');
   console.log(cabinId);
   try {
      const [cabin, bookedDates] = await Promise.all([
         getCabin(cabinId),
         getBookedDatesByCabinId(cabinId),
      ]);
      return Response.json({ cabin, bookedDates });
   } catch {
      return Response.json({ message: 'Cabin not found ' });
   }
}
