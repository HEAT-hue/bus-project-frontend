import { BUS_OPERATIONAL_STATUS, Session } from "@/lib/definitions";
import Image from "next/image";
import { SelectBus } from "./_component";

import { getSession } from "@/lib/session";
import { fetchBus } from "@/lib/user/action";

const UserSelectionPage = async () => {
  const session: Session = await getSession()

  const busPage = await fetchBus(session.token, {
    "page": 1,
    "size": 10,
    "query": "",
    "sortDirection": "DESC",
    "operationalStatus": BUS_OPERATIONAL_STATUS.ACTIVE
  });

  console.log(busPage);

  const buses = busPage.content

  return (
    <>
      <div className="w-[95vw] mx-auto max-w-[928px]">
        <SelectBus buses={buses} />

        <div className=" mt-8 grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {buses.map((bus) => (
            <BusCard
              key={bus.busId}
              route={bus.routeName}
              numberPlate={bus.busNumber}
            />
          ))}
        </div>
      </div>
    </>
  )
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
