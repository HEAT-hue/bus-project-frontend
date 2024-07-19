// import { Bus } from "@/lib/definitions"

// type BusTableProp = {
//     buses: Bus[]
// }

// export const BusTable: React.FC = () => {
//     return (
//         <>
//             <div id="largegenerictable" className="flex flex-col gap-2 text-[16px] ">
//                 <table className="w-full  border-separate border-spacing-y-4 ">
//                     <thead className="">
//                         <tr id="header" className="text-[#00567B] pb-20">
//                             <th className="">S/N</th>
//                             <th className="font-Gilroy-SemiBold">
//                                 Bus Number
//                             </th>
//                             <th className="font-Gilroy-SemiBold">
//                                 Model
//                             </th>
//                             <th className="font-Gilroy-SemiBold">
//                                 Capacity
//                             </th>
//                             <th className="font-Gilroy-SemiBold">
//                                 Color
//                             </th>
//                             <th className="font-Gilroy-SemiBold">
//                                 Route
//                             </th>
//                             <th className="font-Gilroy-SemiBold">
//                                 Status
//                             </th>
//                             <th className="font-Gilroy-SemiBold">
//                                 Action
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="">
//                         {data.map((item, index) => {
//                             return (
//                                 <tr
//                                     id="staff"
//                                     key={index}
//                                     className=" text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D]"
//                                 >
//                                     {" "}
//                                     <td className="rounded-l-lg whitespace-nowrap">{index + 1}</td>
//                                     {headers.map((header, index) => {
//                                         return header !== "status" ? (
//                                             <td
//                                                 key={header}
//                                                 className={`px-6 py-4 ${index + 1 === lenCol && !isAction && "rounded-r-lg"
//                                                     }  border-none whitespace-nowrap font-Gilroy-Regular`}
//                                             >
//                                                 {item[header]}
//                                             </td>
//                                         ) : (
//                                             <td className=" flex justify-center items-center font-Gilroy-SemiBold whitespace-nowrap ">
//                                                 <Tags statusName={item[header]} />
//                                             </td>
//                                         );
//                                     })}
//                                     {isAction && (
//                                         <td className=" rounded-r-lg whitespace-nowrap font-Gilroy-Regular">
//                                             View
//                                         </td>
//                                     )}
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>
//             </div > {" "}
//         </>
//     )
// }

// export default BusTable