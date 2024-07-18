import { Session } from "@/lib/definitions";
import Image from "next/image";
import { SelectBus } from "./_component";

import { getSession } from "@/lib/session";
import { fetchBus } from "@/lib/user/action";
import { redirect } from "next/navigation";
import DisplayBuses from "./_component/DisplayBuses";

const UserSelectionPage = async () => {
  const session: Session = await getSession();

  // if (!session) {
  //   redirect("/login")
  // }

  // const busPage = await fetchBus(session.token, {})

  // const buses = busPage.content

  const buses = [
    { busId: "1", routeName: "Berger", busNumber: "122b2k" },
    { busId: "2", routeName: "Ikeja", busNumber: "34a3m" },
    { busId: "3", routeName: "Yaba", busNumber: "56c4n" },
    { busId: "4", routeName: "Ojota", busNumber: "78d5o" },
    { busId: "5", routeName: "Lekki", busNumber: "90e6p" },
    { busId: "6", routeName: "VI", busNumber: "12f7q" },
    { busId: "7", routeName: "Ajah", busNumber: "34g8r" },
    { busId: "8", routeName: "Epe", busNumber: "56h9s" },
    { busId: "9", routeName: "Badagry", busNumber: "78i1t" },
    { busId: "10", routeName: "Ikorodu", busNumber: "90j2u" },
    { busId: "11", routeName: "Surulere", busNumber: "12k3v" },
    { busId: "12", routeName: "Oshodi", busNumber: "34l4w" },
    { busId: "13", routeName: "Festac", busNumber: "56m5x" },
  ];

  return (
    <>
      <div className="w-[95vw] mx-auto max-w-[928px]">
        <SelectBus buses={buses} />

        <DisplayBuses buses={buses} />
      </div>
    </>
  );
};

export default UserSelectionPage;
