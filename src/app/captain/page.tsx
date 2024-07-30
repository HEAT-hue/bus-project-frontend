import { fetchBookings } from "@/lib/captain/action"
import { Bus, Session } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import { fetchBus } from "@/lib/user/action";
import ViewBookings from "./_components/ViewBookings";

export default async function CaptainPage() {

    const session: Session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const buses = (await fetchBus(session.token, {})).content;

    const busAssignedToCaptain = buses.find((bus: Bus) => {
        return bus.captain?.id == session.id
    });

    console.log(busAssignedToCaptain);

    if (!busAssignedToCaptain) {
        redirect("/user");
    }

    let currentBookings;

    try {
        currentBookings = await fetchBookings(session.token, { busId: busAssignedToCaptain?.busId });
    } catch (error) {
        return (
            <>
                <p>An error has occurred!</p>
            </>
        )
    }

    console.log(currentBookings);


    return (
        <div className="px-4 lg:px-inlinePage">

            {/* Hero Section */}
            <div className="flex flex-col max-w-[100vh] w-[90%] mx-auto mb-[3vh]">
                <div className="mt-[3vh]">
                    <h1 className="text-lg text-gray-600 font-Gilroy-Bold text-center mb-[5%]">
                        {`Hello ${session.firstName} ${session.lastName}`}
                    </h1>
                    <div className="flex flex-col  sm:flex-row items-center sm:justify-center whitespace-nowrap ">
                        <div className="flex sm:self-end ">
                            <div className="px-6 py-4 space-y-3 self-end">
                                <div className="flex flex-row space-x-9 justify-between">
                                    <h3 className="text-sm text-gray-500 font-Gilroy-UltraLight">Route:</h3>
                                    <p className="text-gray-600 text-sm font-Gilroy-SemiBold">{busAssignedToCaptain?.routeName}</p>
                                </div>
                                <div className="flex flex-row space-x-9 justify-between">
                                    <h3 className="text-sm  text-gray-500 font-Gilroy-UltraLight">Bus Driver:</h3>
                                    <p className="text-gray-600 text-sm font-Gilroy-SemiBold">{busAssignedToCaptain?.driverName}</p>
                                </div>
                                <div className="flex flex-row space-x-9 justify-between">
                                    <h3 className="text-sm text-gray-500 font-Gilroy-UltraLight">Driver number:</h3>
                                    <p className="text-gray-600 text-sm font-Gilroy-SemiBold">{busAssignedToCaptain?.driverPhoneNumber}</p>
                                </div>

                            </div>
                        </div>
                        <div>
                            <Image src="/busBlue.svg" width={200} height={200} alt="bus image" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Verify Booking Section */}
            <ViewBookings session={session} bookings={currentBookings} />
        </div>
    )
}