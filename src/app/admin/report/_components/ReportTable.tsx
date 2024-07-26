import { Report } from "@/lib/definitions"
import { getFormattedDate } from "@/lib/utils/utils";

type ReportTableProp = {
    reports: Report[]
}

const ReportTable: React.FC<ReportTableProp> = ({ reports }) => {
    return (
        <>
            <div id="largegenerictable" className="flex flex-col gap-2 text-[16px] ">
                <table className="w-full  border-separate border-spacing-y-3 ">
                    <thead className="">
                        <tr id="header" className="text-[#00567B] pb-20">
                            <th className="">S/N</th>
                            <th className="font-Gilroy-SemiBold">
                                Name
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Email
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Activity
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Department
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {reports.map((report: Report, index) => {
                            const { day, monthShort, year, time } = getFormattedDate(new Date(report.date))
                            return (
                                <tr
                                    id="staff"
                                    key={index}
                                    className=" text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D]"
                                >
                                    {" "}
                                    <td className="rounded-l-lg whitespace-nowrap">{index + 1}</td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {report.fullname}
                                    </td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {report.email}
                                    </td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {report.activity}
                                    </td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {report.department}
                                    </td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {`${day}, ${monthShort} ${year} : ${time}`}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ReportTable