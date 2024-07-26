import { Report } from "@/lib/definitions"
import { getFormattedDate } from "@/lib/utils/utils";

type ReportTableProp = {
    reports: Report[]
}

const ReportTableMV: React.FC<ReportTableProp> = ({ reports }) => {
    return (
        <div className="flex flex-row items-center sm:text-[13px] font-Gilroy-SemiBold text-[12px] justify-between p-3 bg-[#F4F4F4] rounded-lg">
            {reports.map((report: Report) => {
                const { day, monthShort, year, time } = getFormattedDate(new Date(report.date))
                return (
                    <>
                        <div className="flex flex-col">
                            <span className="font-Gilroy-ExtraBold">{report.fullname}</span>
                            <span className="text-[9px] sm:text-[10px] ">
                                {report.department}
                            </span>
                        </div>
                        <span className="">{report.email}</span>
                        <span className="">{report.activity}</span>
                        <span className="">{`${day}, ${monthShort} ${year} : ${time}`}</span>
                    </>
                )
            })}
        </div>
    )
}

export default ReportTableMV