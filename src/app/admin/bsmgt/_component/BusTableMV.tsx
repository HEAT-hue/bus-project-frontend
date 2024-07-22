import { Bus, BUS_OPERATIONAL_STATUS } from "@/lib/definitions"
import classNames from "classnames"

type BusTableProp = {
    buses: Bus[]
}

const BusTableMV: React.FC<BusTableProp> = ({ buses }) => {

    return (
        <>
            <div className="divide-y divide-gray-200">
                {buses.map((bus, index: number) => {
                    return (
                        <div key={index}
                            // className="py-2 "
                            className={classNames({
                                ' bbg-gradient-to-br from-white to-[#3C8930]/5 text-green-800': bus.operationalStatus == BUS_OPERATIONAL_STATUS.ACTIVE,
                                ' bbg-gradient-to-br from-white to-[#B3261E]/5 text-error': bus.operationalStatus == BUS_OPERATIONAL_STATUS.INACTIVE,
                                'p-2': true
                            })}
                        >

                            <div className="flex flex-col gap-y-1">
                                <div className="flex justify-between">
                                    <p><span className="text-gray-500">Route:</span> <span className="text-sm">{bus.routeName}</span></p>
                                    <div className=" flex justify-center items-center font-Gilroy-SemiBold whitespace-nowrap ">
                                        <div
                                            className={classNames({
                                                ' text-[#3C8930] bg-[#3C8930]/40': bus.operationalStatus == BUS_OPERATIONAL_STATUS.ACTIVE,
                                                ' text-[#B3261E] bg-[#B3261E]/40': bus.operationalStatus == BUS_OPERATIONAL_STATUS.INACTIVE,
                                                'flex justify-center items-center max-w-[130px]  py-1 px-2 rounded w-full text-xs': true
                                            })}
                                        >
                                            {bus.operationalStatus}
                                        </div>
                                    </div>
                                </div>
                                <p><span className="text-gray-500">Bus Number:</span> <span className="text-sm">{bus.busNumber}</span></p>
                                <p><span className="text-gray-500">Capacity: </span> <span className="text-sm">{bus.busCapacity}</span></p>
                            </div>
                        </div>
                    )
                })

                }
            </div>
        </>
    )
}

export default BusTableMV