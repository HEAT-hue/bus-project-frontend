import delay from "delay";
import { SelectBus } from "./_component";
import { Bus } from "@/lib/definitions";
import { ROUTE_SECRET } from "@/lib/definitions";

const UserSelectionPage = async () => {

    // Check if user has booked. - Redirect to confirmation page
    // If booking doesn't exist. Stay here    
    // const result = await delay(5000);

    const buses: Bus[] = [
        {
            id: "1",
            name: "Soole",
            route: "Ajah",
            busNumber: "K9892"
        },
        {
            id: "1",
            name: "Soole",
            route: "Ajah",
            busNumber: "K9892"
        },
        {
            id: "1",
            name: "Soole",
            route: "Ajah",
            busNumber: "K9892"
        },
        {
            id: "1",
            name: "Soole",
            route: "Ajah",
            busNumber: "K9892"
        },
        {
            id: "1",
            name: "Soole",
            route: "Ajah",
            busNumber: "K9892"
        },
        {
            id: "1",
            name: "Soole",
            route: "Ajah",
            busNumber: "K9892"
        },
        {
            id: "1",
            name: "Soole",
            route: "Ajah",
            busNumber: "K9892"
        },
        {
            id: "1",
            name: "Soole",
            route: "Ajah",
            busNumber: "K9892"
        },
        {
            id: "1",
            name: "Soole",
            route: "Ajah",
            busNumber: "K9892"
        },
    ]


    return (
        <>
            <div className="w-[95vw] mx-auto max-w-[928px]">
                <SelectBus buses={buses} route_secret={ROUTE_SECRET} />
            </div>
        </>
    )
}

export default UserSelectionPage;