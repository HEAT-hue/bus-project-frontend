import delay from "delay";
import { SelectBus } from "./_component";
import { Bus } from "@/lib/definitions";
import { ROUTE_SECRET } from "@/lib/definitions";
import Image from "next/image";

const UserSelectionPage = async () => {
  // Check if user has booked. - Redirect to confirmation page
  // If booking doesn't exist. Stay here
  // const result = await delay(5000);

  const buses: Bus[] = [
    {
      id: "1",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "2",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "3",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "4",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "5",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "6",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "7",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "8",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "9",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "10",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "11",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
    {
      id: "12",
      name: "Soole",
      route: "Ajah",
      busNumber: "K9892",
    },
  ];

  return (
    <>
      <div className="w-[95vw] mx-auto max-w-[928px]">
        <SelectBus buses={buses} route_secret={ROUTE_SECRET} />

        <div className=" mt-8 grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {buses.map((bus) => (
            <BusCard
              key={bus.id}
              route={bus.route}
              numberPlate={bus.busNumber}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserSelectionPage;

function BusCard({ route, numberPlate }: any) {
  return (
    <div className="border-[1px] rounded-[4px] border-black flex flex-col justify-center items-center p-3 hover:cursor-pointer ">
      <Image src="/bus.svg" width={116.4} height={63} alt="Bus image" />

      <h3 className="mt-4 font-Gilroy-Medium">{route}</h3>
      <h4 className="mt-1 font-Gilroy-Medium">{numberPlate}</h4>
    </div>
  );
}
