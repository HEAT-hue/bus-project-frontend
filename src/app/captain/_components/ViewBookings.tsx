/* eslint-disable @next/next/no-img-element */
'use client'
import "./WaitingList.css";
import { BookBusResponse } from "@/lib/user/action"
import classNames from "classnames"
import { CSSProperties, Dispatch, SetStateAction, useState } from "react"
import { BeatLoader } from "react-spinners"
import toast, { Toaster } from 'react-hot-toast'
import { updateBookings } from "@/lib/captain/action"
import { BOOKING_TYPE, NAVIGATION, Session } from "@/lib/definitions"
import { Modal } from "@/components/ModalWrapper"
import delay from "delay"
import { useRouter } from "next/navigation";

type ViewBookingsProp = {
    session: Session
    bookings: BookBusResponse[]
}

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const ViewBookings: React.FC<ViewBookingsProp> = ({ session, bookings }) => {

    // Get App router
    const router = useRouter();

    const [batchItems, setBatchItems] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState<boolean>(false);

    const reservedBookings = bookings.filter((booking: BookBusResponse) => {
        return booking.status == BOOKING_TYPE.RESERVED
    })

    const waitlistBookings = bookings.filter((booking: BookBusResponse) => {
        return booking.status == BOOKING_TYPE.WAITLIST
    })

    function toggleBatchItem(id: number) {
        if (batchItems.has(id)) {
            setBatchItems((prev) => {
                prev.delete(id);
                return new Set(prev);
            });
            return
        }
        setBatchItems((prev) => new Set(prev).add(id))
    }

    function handleUpdateBookings() {
        if (batchItems.size < 1) {
            toast.error("No item selected!");
        }

        // Set button pending state
        setLoading(true);


        const fetchPromises = Array.from(batchItems).map(id => {
            return (
                updateBookings(session.token, { bookingId: id })
                    .then(response => response.json())
                    .then(data => ({ status: 'fulfilled', data }))
                    .catch(error => (
                        { status: 'rejected', reason: error })
                    )
            );
        }
        );

        Promise.allSettled(fetchPromises)
            .then(results => {
                results.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        console.log(`Data for ids ${[index]}:`, result.status);
                    } else {
                        console.error(`Error fetching data for ids ${[index]}:`, result.reason);
                    }
                });

                setLoading(false);
            });

        toast.success("All bookings have been saved successfully!",);

        (async function () {
            await delay(2000);
        })()

        // Move to checkout page
        router.push(NAVIGATION.CAPTAIN_CHECKOUT);
    }


    return (
        <div className="flex flex-col justify-center sm:flex-row sm:justify-between mb-[10%] mt-[8vh] border border-red-900" >
            <div className="w-full sm:w-1/2 mx-auto">
                <table className="sm:w-[80%] w-[100%] mx-auto">
                    <thead id='first-thead'>
                        <tr>
                            <th className='font-Gilroy-Bold text-sm'>S/N</th>
                            <th className='font-Gilroy-Bold text-sm'>Name</th>
                            <th className='text-center font-Gilroy-Bold text-sm'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservedBookings.map((item, index) => (
                            <>
                                <tr key={index} className="border-b cursor-pointer mb-2" onClick={() => toggleBatchItem(item.id)}>
                                    <td className='pt-4 font-Gilroy-Regular text-sm text-center'>{index + 1}</td>
                                    <td className='pt-4 font-Gilroy-Regular text-sm text-center capitalize'>{`${item.user.firstName} ${item.user.lastName}`}</td>
                                    {/* <td className="font-Gilroy-SemiBold text-center pt-4 text-sm">{item.seat}</td> */}
                                    <td className='text-center pt-4'>
                                        <div className="flex justify-center">
                                            <img
                                                src={batchItems.has(item.id) ? '/checked.svg' : '/unchecked.svg'}
                                                alt={batchItems.has(item.id) ? 'Checked' : 'Unchecked'}
                                                className="h-5 w-5"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )
                        )}
                    </tbody>
                </table>

                <div className="w-full flex justify-center items-center mt-9">
                    {
                        loading ? (
                            <BeatLoader
                                color={"#0282ad"}
                                loading={true}
                                cssOverride={override}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    alert("Hello babies");
                                    handleUpdateBookings();
                                }}
                                className={classNames({
                                    'bg-gray-400': batchItems.size < 1,
                                    'bg-ecobankBlue': batchItems.size > 0,
                                    'rounded px-[2rem] py-3 text-sm focus:outline-none mt-5 cursor-pointer text-white': true
                                })}>
                                Save All Changes
                            </button>
                        )
                    }
                </div>
            </div>

            {/* Waiting list */}
            <WaitingList bookings={waitlistBookings} toggleBatchItem={toggleBatchItem} batchItems={batchItems} />

            {/* Toast messages */}
            <Toaster />
        </div >
    )
}

export default ViewBookings


type WaitingListProps = {
    bookings: BookBusResponse[]
    batchItems: Set<number>
    toggleBatchItem(id: number): void
}

function WaitingList({ batchItems, bookings, toggleBatchItem }: WaitingListProps) {

    // Waiting list modal
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <div id="cpt">
                <button onClick={toggleModal} className="fixed bottom-8 right-8 bg-ecobankLightTeal text-white w-16 h-16 flex justify-center items-center rounded-full cursor-pointer z-50">
                    {/* <p className="text-center self-center flex justify-center">
          Waiting List
        </p> */}
                    <img src="waitinglist.svg" className="w-7" alt="Watiting" />
                </button>

                {modal && (
                    <Modal bare={true} closeModal={() => { }}>
                        <div className="modal w-[100%] h-[100%] flex justify-center items-center top-0 left-0">
                            <div onClick={toggleModal} className="overlay w-[100%] h-[100%] top-0 fixed left-0"></div>
                            <div className="modal-content slide-in-fwd-center relative overflow-y-auto">
                                <div className="w-full items-center flex">
                                    <div className="testing max-w-[100vh]  mx-auto rounded overflow-hidden items-center">
                                        <div className="px-6 py-4 w-auto">
                                            <h1 className="font-Gilroy-Medium text-center text-xl">
                                                Waitlist
                                            </h1>
                                            <div className="absolute top-0 right-0 p-1">
                                                <button className="self-end" onClick={toggleModal}>
                                                    <img src="cancel.svg" alt="cancel" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="px-6 py-4 w-[37vh] sm:w-[30vw]">
                                            <div className="flex items-center justify-center gap-x-[20%]">
                                                <table className="w-full text-left">
                                                    <thead id='first-thead'>
                                                        <tr>
                                                            <th className='font-Gilroy-Bold text-sm'>Name</th>
                                                            <th className='text-center font-Gilroy-Bold text-sm'>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {bookings.slice(0, 10).map((item, index) => (
                                                            <tr key={index} className="border-b" onClick={() => toggleBatchItem(item.id)}>
                                                                <td className='pt-4 font-Gilroy-Regular text-sm'>{`${item.user.firstName} ${item.user.lastName}`}</td>
                                                                <td className='text-center pt-4'>
                                                                    <div className="flex justify-center">
                                                                        <img
                                                                            src={batchItems.has(item.id) ? '/checked.svg' : '/unchecked.svg'}
                                                                            alt={batchItems.has(item.id) ? 'Checked' : 'Unchecked'}
                                                                            className="h-5 w-5"
                                                                        />
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center my-[5%]">
                                            {/* heres the button that says done ,i dont really know what request to make with it so onclick is empty */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    toggleModal()
                                                }}
                                                className={classNames({
                                                    'rounded px-[2rem] py-3 text-sm bg-ecobankBlue focus:outline-none mt-5 cursor-pointer text-white': true
                                                })}>
                                                Done
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </>
    )
}