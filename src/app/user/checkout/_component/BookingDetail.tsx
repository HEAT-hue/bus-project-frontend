'use client'
import { getFormattedDate } from '@/lib/utils/utils';
import { QRCodeCanvas } from 'qrcode.react';


const BookingDetail = () => {

    // Get this details from the backend
    const { year, monthShort, day } = getFormattedDate(new Date());
    return (
        <>
            <div className='flex flex-col-reverse items-center justify-center sm:flex-row gap-5 gap-x-12 max-w-[500px] mx-auto'>
                {/* Booking details */}
                <div>
                    <QRCodeCanvas value="https://reactjs.org/" size={120} />
                </div>


                {/* Depature details */}
                <div className="w-[85vw] max-w-[500px] mx-auto flex flex-col gap-y-3 font-Gilroy-Regular">
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Time of Departure:</p>
                        <p className="text-gray-500">6:00pm</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Boarding time:</p>
                        <p className="text-gray-500">5:40pm</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Date:</p>
                        <p className="text-gray-500">{`${day} ${monthShort}, ${year}`}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Take-off Point:</p>
                        <p className="text-gray-500">EPAC</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Drop off point</p>
                        <p className="text-gray-500">{'Ikorodu'}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Route</p>
                        <p className="text-gray-500">Ikorodu</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingDetail