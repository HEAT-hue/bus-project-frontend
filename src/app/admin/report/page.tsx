import ExportData from "@/components/Export";
import { fetchReports } from "@/lib/admin/report/action";
import { Report, Session } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ReportTable from "./_components/ReportTable";
import ReportTableMV from "./_components/ReportTableMV";

export default async function ReportPage() {

  const session: Session = await getSession();

  if (!session) {
    redirect("/login")
  }

  const reports: Report[] = await fetchReports(session.token, {})

  return (
    <div className="flex flex-col h-full font-[500] trans-range:px-6 px-[57px] max-sm:px-4 max-sm:w-full py-[33px] gap-8 max-sm:gap-4">
      <h1 className="text-[32px] max-sm:text-[25px] font-Gilroy-SemiBold text-[#023448]">
        Reports
      </h1>

      <div className="flex justify-between items-center">
        <h2 className="font-Gilroy-Medium"> <span className=" border-b border-b-gray-500 pb-1">Activity Report</span></h2>

        <ExportData data={reports} />
      </div>

      {/* Reports table desktop view */}
      <div className="hidden lg:block">
        <ReportTable reports={reports} />
      </div>

      {/* Reports table mobile view */}
      <div className="lg:hidden">
        <ReportTableMV reports={reports} />
      </div>
    </div>
  );
}
