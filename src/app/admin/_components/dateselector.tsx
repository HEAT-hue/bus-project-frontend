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
    <div
      id="filtergrid"
      className="grid grid-cols-4 w-fit font-Gilroy-Bold max-sm:grid-cols-3 filter lg:mt-0 text-[16px] max-sm:text-[14px] items-end gap-4 "
    >
      <div className="flex flex-col gap-1 ">
        <span>Search by:</span>
        <Select
          defaultValue="date"
          style={{ width: 120, height: 40, color: "#005A86" }}
          onChange={handleChange}
          options={[
            { value: "date", label: "Date Range" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
          ]}
        />
      </div>
      <div id="startbox" className="flex flex-col gap-1">
        <span>Start date</span>
        <DatePicker onChange={onChange} style={{ width: 120, height: 40 }} />
      </div>{" "}
      <div id="endbox" className="flex flex-col gap-1">
        <span>End date</span>
        <DatePicker onChange={onChange} style={{ width: 120, height: 40 }} />
      </div>{" "}
      <div className="flex-row flex p-2 w-[120px] h-[40px] bg-white border border-[#005A86] rounded-md flex-end ">
        <div className="flex flex-row justify-between basis-3/4 overflow-hidden ">
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
    </div>
  );
}
