'use client'
import { Bus, Session } from "@/lib/definitions"
import { prepareBusStopData } from "@/lib/utils/utils";
import { Select } from "antd";
import { useState } from "react";
import classNames from "classnames";
import { getSession } from "@/lib/session";
import { bookBus } from "@/lib/user/action";

type BookSeatProp = {
    bus: Bus
    session: Session
}

const BookSeat: React.FC<BookSeatProp> = ({ bus }) => {

    const [selectedDropOffPoint, setSelectedDropOffPoint] = useState<string | undefined>(undefined);

    async function handleBook() {
        try {

        } catch (error) {

        }
    }


    return (
        <div className="max-w-[340px]">
            <form action={handleBook}>
                <div className="flex flex-col gap-y-3">
                    <label htmlFor="bus_stop">Drop-off Point</label>
                    <div>
                        <Select
                            placeholder="Select your bus stop"
                            onChange={(e) => setSelectedDropOffPoint(e)}
                            style={{ width: "100%", height: 45, border: "1px" }}
                            options={prepareBusStopData(bus.busStops)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!selectedDropOffPoint}
                    className={classNames({
                        ' text-white bg-ecobankBlue': selectedDropOffPoint,
                        ' text-white bg-gray-400': !selectedDropOffPoint,
                        'w-full font-bold text-white mt-7 rounded font-Inter-Bold py-3': true
                    })}
                >Book Now</button>
            </form>
        </div>
    )
}

export default BookSeat