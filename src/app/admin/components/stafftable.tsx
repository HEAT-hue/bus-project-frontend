import { Table } from "antd";
import TypedInputNumber from "antd/es/input-number";

export default function StaffTable() {
  return (
    <div className="flex flex-col gap-2 mt-8 max-lg:w-[900px] sm:text-[13px] text-[16px] ">
      <table className="w-full  border-separate border-spacing-y-6 ">
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
          <tr id="staff" className=" text-center  tablerow bg-[#F4F4F4] ">
            <td className="rounded-l-lg">1</td>
            <td className=" ">Joyce Orimolowo</td>
            <td className=" ">Marketing & Corp Comms</td>
            <td className=" ">ENG</td>
            <td className=" ">ENG/FST/067</td>
            <td className=" ">jorimolowo@ecobank.com</td>
            <td className="">09058897701</td>
            <td className=" ">
              <span className="flex justify-center items-center bg-red-200 py-1 rounded-lg  w-full">
                status
              </span>
            </td>
            <td className="rounded-r-lg ">View</td>
          </tr>
          <tr id="staff" className=" text-center  tablerow bg-[#F4F4F4] ">
            <td className="rounded-l-lg">1</td>
            <td className=" ">Joyce Orimolowo</td>
            <td className=" ">Marketing & Corp Comms</td>
            <td className=" ">ENG</td>
            <td className=" ">ENG/FST/067</td>
            <td className=" ">jorimolowo@ecobank.com</td>
            <td className=" ">09058897701</td>
            <td className=" ">
              <span className="flex justify-center items-center bg-red-200 py-1 rounded-sm  w-full">
                status
              </span>
            </td>
            <td className="rounded-r-lg ">View</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
