'use client'
import { UpdateBusRouteDetails } from "@/lib/admin/captain/action";
import { Account, Bus, BUS_OPERATIONAL_STATUS, Session } from "@/lib/definitions";
import { FetchError } from "@/lib/FetchError";
import classNames from "classnames";
import { CSSProperties, useState } from "react";
import toast, { Toaster } from 'react-hot-toast'
import { BeatLoader } from "react-spinners";
import SelectCaptain from "./SelectCaptain";
import delay from "delay";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

type ViewCaptainModalProp = {
    buses: Bus[]
    bus: Bus
    session: Session
    closeModal: () => void
    captains: Account[]
}

export default function ViewCaptainModal({ bus, buses, session, captains, closeModal }: ViewCaptainModalProp) {
    const [loading, setLoading] = useState<boolean>(false);
    const [captain, setCaptain] = useState<Account | null>(bus.captain)

    function updateBusDetails() {
        // Set button pending state
        setLoading(true);

        if (!captain) {
            return
        }

        (async function () {
            try {
                const updatedBus = await UpdateBusRouteDetails(session.token, { busId: bus.busId }, { captainId: captain.id, driverId: 3, routeName: bus.routeName });
                setLoading(false);
                toast.success("Captain updated successfully")
                // captainId
                setCaptain(updatedBus.captain);
                await delay(2000);
                closeModal();
            }
            catch (error) {
                // Clear pending state
                if (error instanceof FetchError) {
                    toast.error(error.message);
                }
            } finally {
                setLoading(false);
            }

        })();
    }
    return (
        <>
            <div>
                {/* Search captain to Add */}
                <div className="p-7">
                    <h1 className="text-ecobankBlue text-xl font-Gilroy-Medium">Update Bus Captain</h1>

                    {/* Select Captain */}
                    <div className="mt-3">
                        <SelectCaptain buses={buses} captains={captains} setCaptain={setCaptain} />
                    </div>


                    {captain && (
                        <>
                            {/* View captain Form */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">

                                {/* Captain's name */}
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="route" className="text-sm">Captain&lsquo;s name</label>
                                    <input
                                        value={captain.firstName ?? ""}
                                        placeholder="Bus Number"
                                        disabled
                                        type="text" required name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
                                    />
                                </div>

                                {/* Captain's email */}
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="route" className="text-sm">Captain&lsquo;s email</label>
                                    <input
                                        value={captain.email}
                                        disabled
                                        type="email" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
                                    />
                                </div>

                                {/* Captain's phone number */}
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="route" className="text-sm">Captain&lsquo;s phone number</label>
                                    <input
                                        value={captain.telephone}
                                        disabled
                                        type="text" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue" />
                                </div>

                                {/* Captain's staff Id */}
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="route" className="text-sm">Captain&lsquo;s staff Id</label>
                                    <input
                                        disabled
                                        value={captain.staff_id}
                                        type="text" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue" />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="w-full flex justify-center mt-9">
                        <button
                            type="submit"
                            onClick={updateBusDetails}
                            disabled={bus.captain?.id == captain?.id}
                            className={classNames({
                                'rounded px-32 py-3 text-sm text-white bg-darkBlue hover:bg-darkBlue/90 focus:outline-none mt-5 cursor-pointer': true,
                                'rounded px-32 py-3 text-sm text-white bg-gray-600 hover:bg-gray-600 focus:outline-none mt-5 cursor-pointer': bus.captain?.id == captain?.id
                            })}>
                            {loading ? (
                                <BeatLoader
                                    color={"#ffffff"}
                                    loading={true}
                                    cssOverride={override}
                                    size={10}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            ) : "Save"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Toast messages */}
            <Toaster />
        </>
    )
}
