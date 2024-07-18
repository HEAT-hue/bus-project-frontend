import { SelectBus } from "./_component";

const UserSelectionPage = async () => {

    // Check if user has booked. - Redirect to confirmation page
    // If booking doesn't exist. Stay here    
    // const result = await delay(5000);

    const buses: any[] = [
        {
            id: "1",
            name: "Soole",
            route: "Ajah",
            busNumber: "K9892",
            busStops: [
                {
                    id: "1",
                    name: "Ikorodu"
                },
                {
                    id: "2",
                    name: "Agege"
                },
                {
                    id: "3",
                    name: "Ogolonto"
                },
                {
                    id: "4",
                    name: "Agege"
                },
                {
                    id: "5",
                    name: "Ogolonto"
                },
            ]
        },
    ]


    return (
        <>
            <div className="w-[95vw] mx-auto max-w-[928px]">
                <SelectBus buses={buses} />
            </div>
        </>
    )
}

export default UserSelectionPage;