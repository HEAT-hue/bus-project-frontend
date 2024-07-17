import Image from "next/image";
import DateSelector from "../_components/dateselector";
import SlidingBar from "../_components/slidingbar";
import Add from "../../../../public/add.png";
import GenericTable, { Data } from "../_components/generic-table";
import SmallTable from "../_components/small-staff";
import SmallRoute from "../_components/small-route";

export default function RouteManagement() {
  let Routedata: Data[] = [
    {
      routeID: "23333",
      route: "Ajah",
      driver: "Tayo Adewole",
      driver_number: "09045678929",
      captain: "Funmi Dowson",
      captain_number: "09045678927",
      status: "Active",
    },
  ];
  return (
    <div className="flex flex-col h-full font-[500] trans-range:px-6 px-[57px] max-sm:px-4 max-sm:w-full py-[33px] gap-8 max-sm:gap-4">
      <h1 className="text-[32px] max-sm:text-[25px] text-[#023448]">
        Route Management
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
          <SlidingBar sections={["Route List"]}>
            <div
              id="largegenerictable"
              className="flex w-[164px] gap-1 rounded-lg max-sm:hidden hover:scale-105 duration-300 flex-row py-2 px-[20px] text-white bg-[#005A86] justify-center items-center"
            >
              <span> Add Route </span>
              <Image src={Add} className="w-6 h-6" alt="add" />
            </div>
          </SlidingBar>
        </div>

        <div className="flex flex-row items-center"></div>
      </div>
      <DateSelector />
      <GenericTable data={Routedata}>
        <SmallRoute />
      </GenericTable>{" "}
    </div>
  );
}
