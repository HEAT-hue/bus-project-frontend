import { Report } from "@/lib/definitions";
import { getFormattedDate } from "@/lib/utils/utils";

type ReportTableProp = {
    reports: Report[]
}

const ReportTableMV: React.FC<ReportTableProp> = ({ reports }) => {
    return (
        <div className="divide-y divide-gray-400">
            {reports.map((report, index) => {
                const { day, monthShort, year, time } = getFormattedDate(new Date(report.date))
                return (
                    <div
                        key={index}
                        className="py-2 flex flex-col gap-y-1"
                    >
                        <div className="flex flex-col gap-y-1 cursor-pointer">
                            <div className="flex justify-between">
                                <p>
                                    <span className="text-gray-500">name:</span>{" "}
                                    <span className="text-sm  capitalize">{report.fullname}</span>
                                </p>
                                <p className="flex flex-col items-end">
                                    <div className="text-ecobankBlue">{report.department}</div>
                                    <div className="text-gray-500 text-sm">{`${day}, ${monthShort} ${year} : ${time}`}</div>
                                </p>
                            </div>
                        </div>
                        <p>
                            <span className="text-gray-500 text-sm">email: </span>{" "}
                            <span className="text">{report.email}</span>
                        </p>
                        <p className="flex gap-x-2 items-center">
                            <span className="text-gray-500">activity: </span>{" "}
                            <span className="text-sm">{report.activity}</span>
                        </p>
                    </div>
                );
            })}
        </div>
    )
}

export default ReportTableMV