"use client";
import { Bus, BUS_OPERATIONAL_STATUS, NAVIGATION } from "@/lib/definitions";
import { encryptData } from "@/lib/utils/cyptoUtils";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

type DisplayBusesProp = {
  buses: Bus[];
};

const DisplayBuses: React.FC<DisplayBusesProp> = ({ buses }) => {
  // const [showBus, setShowBus] = useState<Bus | undefined>(undefined);

  const error = () => {
    Modal.error({
      title: 'Ummm 🙁',
      content: 'This bus is not operational',
      okText: "Ok",
      maskClosable: true,  // Allow the modal to be dismissed by clicking outside
    });
  };

  return (
    <>
      <div className=" mt-8 grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {buses.map((bus: Bus) => {
          return (
            <div key={bus.busId} onClick={() => {
              if (bus.operationalStatus == BUS_OPERATIONAL_STATUS.INACTIVE) {
                error()
                return;
              }
              // setShowBus(bus);
            }}>
              <BusCard
                key={bus.busId}
                bus={bus}
              />
            </div>
          );
        })}
      </div>

      {/* SHow bus modal */}

      {/* {showBus && (
        <ModalWrapper bare={true} closeModal={() => setShowBus(undefined)}>
          <BusDetails bus={showBus} setShowBus={setShowBus} />
        </ModalWrapper>
      )} */}
    </>
  );
};


type BusCardProp = {
  bus: Bus
}

function BusCard({ bus }: BusCardProp) {
  const busActive = bus.operationalStatus == BUS_OPERATIONAL_STATUS.ACTIVE;

  const router = useRouter();

  function handleBusChange() {

    const encryptedBusDetails = encryptData(bus);

    router.push(`${NAVIGATION.USER_BOOK}?st=${encryptedBusDetails}`)
  }


  return (
    <div
      className={`border-[1px] rounded-[4px] ${busActive ? "border-ecobankBlue" : "border-error"} border-ecobankBlue flex flex-col justify-center items-center p-3 hover:cursor-pointer `}
      onClick={handleBusChange}
    >
      <Image src="/bus.svg" width={116.4} height={63} alt="Bus image" />
      <h3 className="mt-4 font-Gilroy-Medium">{bus.routeName}</h3>
      <h4 className="mt-1 font-Gilroy-Medium">{bus.busNumber}</h4>
    </div>
  );
}

export default DisplayBuses;
