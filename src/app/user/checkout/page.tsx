import { BookBusResponse } from "@/lib/user/action";
import BookingDetail from "./_component/BookingDetail"
import { decryptData } from "@/lib/utils/cyptoUtils";
import { redirect } from "next/navigation";
import { BOOKING_TYPE } from "@/lib/definitions";
import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
const ConfirmBookingPage = async ({ searchParams }: { searchParams: { bk: string } }) => {

    let bookRecord;

    try {
        bookRecord = decryptData(searchParams?.bk || "") as BookBusResponse;
    } catch (error: any) {
        redirect("/user")
    }

    if (bookRecord.status == BOOKING_TYPE.WAITLIST) {
        return (
            <>
                <div className="w-full h-full items-center justify-center mt-[5vh] flex-col flex ">
                    <span className="text-yellow-300 font-Gilroy-ExtraBold text-[40px] max-sm:text-[30px]">
                        Oops... The bus is filled up
                    </span>
                    <p className="font-Inter-Regular text-[20px] text-gray-500 max-sm:text-[15px]">
                        You have been placed in the waiting list
                    </p>
                    <Image src={"/waiting.jpg"} alt="waitingalert" width={400} height={400} className="mt-[2vh]" />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="w-[95vw] mx-auto max-w-[928px] pb-[3rem]">
                <h1 className="text-center text-lg sm:text-xl text-ecobankBlue font-medium">Your Booking has been confirmed</h1>
                <div className="mt-7 flex flex-col gap-y-5">

                    <div className="flex justify-center items-center gap-5">
                        {/* Bookign image */}
                        <img src="/pana.svg" alt="booking confirmed" className="mx-aut" width={200} />
                    </div>

                    {/* Booking details */}
                    <div className="mt-7">
                        <h1 className="text-center mb-5 mt-2 font-Inter-Bold text-ecobankGreen text-3xl">Booking number: <span>{bookRecord.id || 8}</span></h1>
                        <BookingDetail bookRecord={bookRecord} />
                    </div>

                    {/* Disclaimer */}
                    <p className="text-gray-700 text-xs text-center mx-auto max-w-[80ch] my-5">** PLEASE NOTE: A confirmation of your booking has been sent to your email address. Please present a copy of this to the Bus Captain upon boarding the bus.</p>

                    {/* Cancel booking */}
                    {/* <button className="w-[328px] mx-auto py-3 rounded bg-error text-white font-Gilroy-Medium hover:bg-error/90">Cancel Booking</button> */}
                </div>
            </div>
        </>
    )
}

export default ConfirmBookingPage