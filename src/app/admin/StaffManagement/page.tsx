import { Button } from "antd";
import DateSelector from "../components/dateselector";
import StaffTable from "../components/stafftable";
import Image from "next/image";
import Export from "../../../../public/export.png";

export default function StaffManagement() {
  return (
    <div className="w-full flex flex-col h-full font-[500] px-[57px] py-[33px] gap-9">
      <h1 className="text-[32px] text-[#023448]">Staff Management</h1>
      <div className="flex flex-col">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row  gap-4">
              <span className="">Staff List</span>
              <span className="">Pending Requests</span>
            </div>
            <div className="w-[300px] items-center bg-[#C3C2C2] flex h-[1px]">
              <div className="w-[70px] h-[3px] bg-[#BED600]"></div>
            </div>
          </div>


          {/* <Button
            type="primary"
            style={{ backgroundColor: "#005A86", color: "white" }}

          >
            Export
          </Button> */}
          <div className="flex w-[164px] rounded-lg  hover:scale-105 duration-300 flex-row py-2 px-[40px] text-white bg-[#005A86] justify-between items-center">
            <span> Export </span>
            <Image src={Export} className="w-6 h-6" alt="export" />
          </div>
        </div>

        <div className="flex flex-row items-center"></div>
      </div>
      <DateSelector />
      <StaffTable />
    </div>
  );
}
