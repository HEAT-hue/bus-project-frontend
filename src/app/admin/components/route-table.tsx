"use client";
import { Table } from "antd";
import TypedInputNumber from "antd/es/input-number";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import Tags from "./table-tags";
import SmallRoute from "./small-route";
type Status = "Pending" | "Active" | "Inactive";
type Route = {
  [key: string]: string;
  status: Status;
};

export default function RouteTable() {
  const isXs = useMediaQuery({ query: "(max-width: 1110px)" });
  const [isnotTable, setisnotTable] = useState(false);
  useEffect(
    function () {
      setisnotTable(isXs);
    },
    [isXs]
  );
  let Staffdata: Route[] = [
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
  return isnotTable ? (
    <SmallRoute />
  ) : (
    <div className="flex flex-col gap-2 text-[16px] ">
      <table className="w-full  border-separate border-spacing-y-4 ">
        <thead className="">
          <tr id="header" className="text-[#00567B] pb-20">
            <th className="">S/N</th>
            <th className="">Route</th>
            <th className="">Driver</th>
            <th className="">Phone Number</th>
            <th className="">Captain</th>
            <th className="">Phone Number</th>
            <th className="">Status</th>
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {Staffdata.map((value, index) => {
            const {
              routeId,
              route,
              driver,
              driver_number,
              captain,
              captain_number,
              status,
            } = value;
            return (
              <tr
                id="staff"
                key={routeId}
                className=" text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D]"
              >
                <td className="rounded-l-lg">{index + 1}</td>
                <td className=" ">{route}</td>
                <td className=" ">{driver}</td>
                <td className=" ">{driver_number}</td>
                <td className=" ">{captain}</td>
                <td className=" ">{captain_number}</td>
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
