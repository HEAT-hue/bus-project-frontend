"use client";
import Export from "../../../../public/export.png";
import Search from "../../../../public/search.png";

import type { DatePickerProps } from "antd";
import { DatePicker, Select, Space } from "antd";
import Image from "next/image";
export default function DateSelector() {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="flex-row flex items-end text-[16px] gap-4 ">
      <div className="flex flex-col gap-1">
        <span>Search by:</span>
        <Select
          defaultValue="date"
          style={{ width: 120, height: 40 }}
          onChange={handleChange}
          options={[
            { value: "date", label: "Date:Range" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
          ]}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span>Start date</span>
        <DatePicker onChange={onChange} style={{ width: 120, height: 40 }} />
      </div>
      <div className="flex flex-col gap-1">
        <span>End date</span>
        <DatePicker onChange={onChange} style={{ width: 120, height: 40 }} />
      </div>{" "}
      {/* <div className="flex flex-row w-[120px] h-[40px] justify-between items-center rounded-lg border relative border-[#005A86]">
        <div className="flex basis-full h-full overflow-hidden rounded-lg ">
          <input
            type="text"
            placeholder="Search"
            className="h-full p-3 border-none text- rounded-lg outline-none -z-10"
          />
        </div>
        <Image
          src={Search}
          className="w-6 h-6 absolute right-[5px] z-10 "
          alt="export"
        />
      </div> */}
      <div className="flex-row flex p-2 w-36 max-sm:w-24 border rounded-md flex-end ">
        <div className="flex bg-green-200 flex-row justify-between basis-3/4 overflow-hidden ">
          {" "}
          <input
            type="text"
            placeholder="Search"
            className="focus:border-none focus:outline-none"
            // value={filterstring}
            // onChange={(e) => setFilterString(e.target.value)}
          />
        </div>
        <div className="flex justify-end basis-1/3 items-center">
          <Image src={Search} className="w-5 h-5" alt="searchimage" />
        </div>
      </div>
    </div>
  );
}
