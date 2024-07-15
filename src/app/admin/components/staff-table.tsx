"use client";
import { Table } from "antd";
import TypedInputNumber from "antd/es/input-number";
import { useMediaQuery } from "react-responsive";
import SmallTable from "./small-staff";
import { useEffect, useState } from "react";
import Tags from "./table-tags";
type Status = "Pending" | "Active" | "Inactive";
type Staff = {
  name: string;
  department: string;
  affiliate: string;
  staffID: string;
  email: string;
  phone: string;
  status: Status;
  action: string;
};

export default function StaffTable() {
  const isXs = useMediaQuery({ query: "(max-width: 1110px)" });
  const [isnotTable, setisnotTable] = useState(false);
  useEffect(
    function () {
      setisnotTable(isXs);
    },
    [isXs]
  );
  let Staffdata: Staff[] = [
    {
      name: "Joyce Orimolowo",
      department: "Marketing & Corp Comms",
      affiliate: "ENG",
      staffID: "ENG/FST/067",
      email: "jorimolowo@ecobank.com",
      phone: "09058897701",
      status: "Pending",
      action: "",
    },
    {
      name: "Joy Omodada",
      department: "Marketing & Corp Comms",
      affiliate: "ENG",
      staffID: "ENG/FST/067",
      email: "jorimolowo@ecobank.com",
      phone: "09058897701",
      status: "Active",
      action: "",
    },
  ];
  return isnotTable ? (
    <SmallTable />
  ) : (
    <div className="flex flex-col gap-2 text-[16px] ">
      <table className="w-full  border-separate border-spacing-y-4 ">
        <thead className="">
          <tr id="header" className="text-[#00567B] pb-20">
            <th className="">S/N</th>
            <th className="">Name</th>
            <th className="">Department</th>
            <th className="">Affiliate</th>
            <th className="">Staff ID</th>
            <th className="">Email Address</th>
            <th className="">Phone Number</th>
            <th className="">Status</th>
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {Staffdata.map((value, index) => {
            const {
              name,
              department,
              affiliate,
              staffID,
              email,
              phone,
              status,
              action,
            } = value;
            return (
              <tr
                id="staff"
                key={staffID}
                className=" text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D]"
              >
                <td className="rounded-l-lg">{index + 1}</td>
                <td className=" ">{name}</td>
                <td className=" ">{department}</td>
                <td className=" ">{affiliate}</td>
                <td className=" ">{staffID}</td>
                <td className=" ">{email}</td>
                <td className=" ">{phone}</td>
                <td className=" ">
                  {/* <span className="flex justify-center items-center bg-red-200 py-1 rounded-lg  w-full">
                    {status}
                  </span> */}
                  <Tags statusName={status} />
                </td>
                <td className="rounded-r-lg ">View</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
// function Tags({ statusName }: { statusName: Status }) {
//   let color = statusName === "Active" ? "text-[#3C8930]" : "text-[#B3261E]";
//   let bgColor = statusName === "Active" ? "bg-[#3C893066]" : "bg-[#B3261E4D]";

//   return (
//     <span
//       className={`flex justify-center items-center ${color} ${bgColor}  py-1 rounded-lg  w-full`}
//     >
//       {statusName}
//     </span>
//   );
// }
