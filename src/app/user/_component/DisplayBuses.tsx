"use client";
import Image from "next/image";
import { Modal } from "@/app/components/ModalWrapper";
import { useState } from "react";
import BusDetails from "./Bus-Details";

type DisplayBusesProp = {
  buses: any;
};

const DisplayBuses: React.FC<DisplayBusesProp> = ({ buses }) => {
  const [showBus, setShowBus] = useState<any | undefined>(undefined);

  return (
    <>
      <div className=" mt-8 grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {buses.map((bus: any) => {
          return (
            <div key={bus.busId} onClick={() => setShowBus(bus)}>
              <BusCard
                key={bus.busId}
                route={bus.routeName}
                numberPlate={bus.busNumber}
              />
            </div>
          );
        })}
      </div>

      {/* SHow bus modal */}
      
      {showBus && (
        <Modal bare={true} closeModal={() => setShowBus(undefined)}>
            <BusDetails bus={showBus} setShowBus={setShowBus} />
        </Modal>
      )}
    </>
  );
};

function BusCard({ route, numberPlate }: any) {
  return (
    <div className="border-[1px] rounded-[4px] border-black flex flex-col justify-center items-center p-3 hover:cursor-pointer ">
      <Image src="/bus.svg" width={116.4} height={63} alt="Bus image" />

      <h3 className="mt-4 font-Gilroy-Medium">{route}</h3>
      <h4 className="mt-1 font-Gilroy-Medium">{numberPlate}</h4>
    </div>
  );
}

export default DisplayBuses;
