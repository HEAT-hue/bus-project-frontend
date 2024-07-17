import { Button } from "antd";
import DateSelector from "../_components/dateselector";
import Image from "next/image";
import Search from "../../../../public/search.png";
import Filter from "../../../../public/filterlist.png";
import Export from "../../../../public/export.png";

import SlidingBar from "../_components/slidingbar";
import SmallTable from "../_components/small-staff";
import GenericTable, { Data } from "../_components/generic-table";

export default function StaffManagement() {
  const Staffdata: Data[] = [
    {
      name: "Joyce Orimolowo",
      department: "Marketing & Corp Comms",
      affiliate: "ENG",
      staffID: "ENG/FST/067",
      email: "jorimolowo@ecobank.com",
      phone: "09058897701",
      status: "Pending",
    },
    {
      name: "Joy Omodada",
      department: "Marketing & Corp Comms",
      affiliate: "ENG",
      staffID: "ENG/FST/067",
      email: "jorimolowo@ecobank.com",
      phone: "09058897701",
      status: "Active",
    },
  ];
  return (
    <div className="flex flex-col h-full font-[500] trans-range:px-6 px-[57px] max-sm:px-4 max-sm:w-full py-[33px] gap-9 max-sm:gap-4">
      <h1 className="text-[32px] max-sm:text-[25px] text-[#023448]">
        Staff Management
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
          <SlidingBar sections={["Staff List", "Pending Request"]}>
            <div className="flex w-[164px] largegenerictable rounded-lg max-sm:hidden hover:scale-105 duration-300 flex-row py-2 px-[40px] text-white bg-[#005A86] justify-between items-center">
              <span> Export </span>
              <Image src={Export} className="w-6 h-6" alt="export" />
            </div>
          </SlidingBar>
        </div>

        <div className="flex flex-row items-center"></div>
      </div>
      <DateSelector />
      <GenericTable data={Staffdata}>
        <SmallTable />
      </GenericTable>
    </div>
  );
}
