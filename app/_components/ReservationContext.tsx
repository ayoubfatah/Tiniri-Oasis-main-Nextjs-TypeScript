'use client';
import { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

type Children = {
   children: React.ReactNode;
};

function ReservationProvider({ children }: Children) {
   const [example, setExample] = useState([]);
   const [range, setRange]: any = useState({ from: undefined, to: undefined });
   function resetRange() {
      setRange({ from: undefined, to: undefined });
   }
   return (
      <ReservationContext.Provider
         value={{
            //values u wanna provide to your app
            range,
            setRange,
            resetRange,
         }}
      >
         {children}
      </ReservationContext.Provider>
   );
}

function useReservation() {
   const context = useContext(ReservationContext);
   if (context === undefined)
      throw new Error(
         'ReservationContext was used outside of the ReservationProvider'
      );
   return context;
}

export { ReservationProvider, useReservation };
