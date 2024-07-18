import Image from "next/image";
import { Button } from "antd";

export default function BusDetails() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="border rounded-md shadow-ecobankBlue shadow-md w-[320px] h-[640px] relative ">
          <div className="absolute right-3 top-3">
            <Image
              src="/cancel-red.svg"
              alt="cancel icon"
              width={23}
              height={23}
            />
          </div>

          <div className="mt-10 flex flex-col items-center font-Gilroy-Regular font-medium ">
            KRD 914 YH
          </div>

          <div className="mt-6 font-Gilroy-SemiBold flex flex-col items-center">
            Bus Infomation
          </div>

          <div className="p-4">
            <div className="flex flex-col gap-8 mt-7">
              <div className="flex justify-between items-center">
                <div className="font-Gilroy-SemiBold">Plate number:</div>
                <div className="font-Gilroy-Regular">KRD 914 YH</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-Gilroy-SemiBold">Bus Driver:</div>
                <div className="font-Gilroy-Regular">Mr. Tayo</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-Gilroy-SemiBold">Bus Captain:</div>
                <div className="font-Gilroy-Regular">Funmi Dawson</div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-10">
              <Image src="/bus.svg" width={283} height={153} alt="bus image" />
            </div>

            <div className="mt-16">
              <Button className="w-full p-5 bg-[#005A86] text-base text-white font-Gilroy-Regular font-semibold ">
                Book a Seat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
