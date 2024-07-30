import BarChartView from "@/components/BarChartView";
import OverviewBox from "@/components/Overviewbox";
import { fetchStats } from "@/lib/admin/dashboard/action";
import { ROLES, Session } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function HomePage() {

  const session: Session = await getSession();

  if (!session) {
    redirect("/login")
  }

  const stats = await fetchStats(session.token);

  const totalStaff = stats.totalAccounts;
  const approvedStaff = stats.approvedAccounts;
  const pendingStaff = stats.pendingAccounts;
  const deniedStaff = stats.rejectedAccounts;


  return (
    <div className="px-4 lg:px-inlinePage">

      {/* Overview boxes */}
      {session.authorities == ROLES.ADMIN && (
        <div className="mt-5 flex gap-[10px] overflow-x-auto md:flex-wrap">

          {/* Total staff overview box */}
          <OverviewBox
            title="Total staff"
            value={`${totalStaff}`}
            background={`conic-gradient(${"#333333"} ${360}deg, #E4E8EF 0deg)`}
          />

          {/* Pending staff box */}
          <OverviewBox
            title="Pending Staff"
            value={pendingStaff.toString()}
            background={`conic-gradient(${"#ffb800"} ${pendingStaff / totalStaff * 360}deg, #E4E8EF 0deg)`}
          />

          {/* Approved staff overview box */}
          <OverviewBox
            title="Approved Staff"
            value={approvedStaff.toString()}
            background={`conic-gradient(${"#347e03"} ${approvedStaff / totalStaff * 360}deg, #E4E8EF 0deg)`}
          />

          {/* Rejected staff overview box */}
          <OverviewBox
            title="Rejected Staff"
            value={deniedStaff.toString()}
            background={`conic-gradient(${"#8d0404"} ${deniedStaff / totalStaff * 360}deg, #E4E8EF 0deg)`}
          />
        </div>
      )}

      <div className="mt-[3rem] grid grid-cols-1 lg:grid-cols-[360px,_1fr] gap-5">
        {/* Bar chart */}
        <div className="w-full h-max">
          <BarChartView busStats={{
            totalBuses: 10,
            activeBuses: 7,
            inactiveBuses: 3
          }} />
        </div>

      </div>
    </div>
  )
}