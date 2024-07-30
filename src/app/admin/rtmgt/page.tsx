import { Bus, Session } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { fetchBus } from "@/lib/user/action";

import { redirect } from "next/navigation";
import RouteTable from "./_components/RouteTable";
import RouteTableMV from "./_components/RouteTableMV";

export default async function RouteManagement() {
  const session: Session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const busResponse = await fetchBus(session.token, {});

  const buses: Bus[] = busResponse.content;

  return (
    <div className="px-4 lg:px-inlinePage">
      <h1 className="text-[32px] max-sm:text-[25px] font-Gilroy-SemiBold text-[#023448] my-2">
        Pick ups Management
      </h1>


      {/* <div className="flex flex-col gap-y-3 my-3 items-end">
        <DateSelector placeholder="Search Bus..." />
      </div> */}


      <div className="flex flex-col">
        <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
          {/* <SlidingBar sections={["Route List"]}>
            <div
              id="largegenerictable"
              className="flex w-[164px] font-Gilroy-SemiBold gap-1 rounded-lg max-sm:hidden hover:scale-105 duration-300 flex-row py-2 px-[20px] text-white bg-[#005A86] justify-center items-center"
            >
              <span> Add Route </span>
              <Image src={Add} className="w-6 h-6" alt="add" />
            </div>
          </SlidingBar> */}
        </div>

        {/* <div className="flex flex-row items-center"></div> */}
      </div>

      <div className="hidden lg:block">
        <RouteTable buses={buses} session={session} />
      </div>

      <div className="lg:hidden">
        <RouteTableMV buses={buses} session={session} />
      </div>
    </div>
  );
}
