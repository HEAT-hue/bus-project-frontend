import { Button } from "antd";
import DateSelector from "../components/dateselector";
import StaffTable from "../components/stafftable";
import Image from "next/image";
import Search from "../../../../public/search.png";
import Filter from "../../../../public/filterlist.png";

import SlidingBar from "../components/slidingbar";
import SmallTable from "../components/smalltable";

export default function StaffManagement() {
  return (
    <div className="flex flex-col h-full font-[500] trans-range:px-6 px-[57px] max-sm:px-4 max-sm:w-full py-[33px] gap-9 max-sm:gap-4">
      <h1 className="text-[32px] max-sm:text-[25px] text-[#023448]">
        Staff Management
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
          {/* <div className="w-[300px] items-center bg-[#C3C2C2] flex h-[1px]">
              <div className="w-[70px] h-[3px] bg-[#BED600]"></div>
            </div> */}
          <SlidingBar />

          {/* <Button
            type="primary"
            style={{ backgroundColor: "#005A86", color: "white" }}

          >
            Export
          </Button> */}
        </div>

        <div className="flex flex-row items-center"></div>
      </div>
      <DateSelector />
      {/* <div className="flex flex-row items-center gap-3">
        <Image src={Filter} className="w-6 h-6" alt="filter" />
        <div className="flex-row flex p-2 w-[120px] h-[40px] border border-[#005A86] rounded-md flex-end ">
          <div className="flex bg-green-200 flex-row justify-between basis-3/4 overflow-hidden ">
            {" "}
            <input
              type="text"
              placeholder="Search"
              className="focus:border-none text-[13px] focus:outline-none"
              // value={filterstring}
              // onChange={(e) => setFilterString(e.target.value)}
            />
          </div>
          <div className="flex justify-end basis-1/3 items-center ">
            <Image src={Search} className="w-4 h-4" alt="searchimage" />
          </div>
        </div>
      </div> */}

      <StaffTable />
    </div>
  );
}
