import { Bus, Session } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import DateSelector from "../_components/dateselector";
import AddBusModal from "./_component/AddBusModal";
import BusTable from "./_component/BusTable";
import { mockBuses } from "@/lib/utils/mock";
import BusTableMV from "./_component/BusTableMV";

export default async function BusManagement() {
  const session: Session = await getSession();

  // if (!session) {
  //   console.log("Trying to redirect");
  //   redirect("/login");
  // }

  // const busResponse = await fetchBus(session.token, {});

  // const buses: Bus[] = busResponse.content;

  const buses: Bus[] = mockBuses;

  return (
    <div className="px-4 lg:px-inlinePage">
      <h1 className="text-[32px] max-sm:text-[25px] font-Gilroy-SemiBold text-[#023448] mt-2">
        Bus Management
      </h1>

      <div className="flex flex-col gap-y-3 my-3 items-end">
        <AddBusModal session={session} />
        <DateSelector placeholder="Search Bus..." />
      </div>

      <div className="hidden lg:block">
        <BusTable buses={buses} />
      </div>

      <div className="lg:hidden">
        <BusTableMV buses={buses} />
      </div>

      {/* <GenericTable
        data={buses}
        tableHeaders={[
          "bus Number",
          "model",
          "capacity",
          "color",
          "route",
          "status",
        ]}
      >
        <SmallBus />
      </GenericTable>{" "} */}
      {/* Add Bus Modal */}
    </div>
  );
}
