import { Account, Bus, FetchBusParams, ROLES, Session } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { fetchBus } from "@/lib/user/action";
import { redirect } from "next/navigation";
import CaptainTable from "./_component/CaptainTable";
import { FetchUserParams, fetchUsers } from "@/lib/admin/staff/action";

export default async function CaptainManagement({ searchParams }: { searchParams: FetchUserParams & FetchBusParams }) {
    const session: Session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const usersResponse = await fetchUsers(session.token, {
        page: searchParams.page || 0,
        role: ROLES.CAPTAIN
    });

    const users = usersResponse.content;


    const busResponse = await fetchBus(session.token, {
        page: searchParams.page || 1,
        size: 10,
        operationalStatus: searchParams.operationalStatus,
        query: searchParams.query
    });

    const buses: Bus[] = busResponse.content;


    return (
        <>
            <div className="px-4 lg:px-inlinePage">
                <h1 className="text-[32px] max-sm:text-[25px] font-Gilroy-SemiBold text-[#023448] mt-2">
                    Captain Management
                </h1>

                <div className="flex flex-col gap-y-3 my-3 items-end">
                    {/* <AddBusModal session={session} />
                    <DateSelector placeholder="Search Bus..." /> */}
                </div>

                <div className="hidden lg:block">
                    <CaptainTable buses={buses} session={session} users={users} />
                </div>

                <div className="lg:hidden">
                    {/* <BusTableMV buses={buses} session={session} /> */}
                </div>
            </div>
        </>
    )
}
