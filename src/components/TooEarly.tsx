import Image from "next/image";
import EarlyPic from "../../public/tooearly.png";

export default function TooEarly() {
  return (
    <div className="w-full h-full items-center justify-center mt-[5vh] flex-col flex ">
      <span className="text-ecobankBlue font-Gilroy-ExtraBold text-[40px] max-sm:text-[30px]">
        Chill... You&rsquo;re too early.
      </span>

      <Image
        src={EarlyPic}
        alt="waitingalert"
        className="mt-[2vh] max-w-[500px] max-sm:w-[360px]"
      />
      <p className="font-Inter-Regular text-[20px] max-sm:text-[15px]">
        Come back by 5:00pm🕔
      </p>
    </div>
  );
}
