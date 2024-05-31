import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

type Settings = {
   siteName: string;
   theme: string;
   currency: string;
};

type BookedDate = {
   date: string;
   isBooked: boolean;
};

export default async function Reservation({ params, cabin }: any) {
   const [settings, bookedDates] = await Promise.all([
      getSettings(),
      getBookedDatesByCabinId(params.cabinId),
   ]);

   return (
      <div className="grid grid-cols-2 my-10  border border-primary-700 min-h-[400px]">
         <DateSelector
            cabin={cabin}
            bookedDates={bookedDates}
            setting={settings}
         />
         <ReservationForm cabin={cabin} />
      </div>
   );
}
