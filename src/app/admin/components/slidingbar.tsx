"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Export from "../../../../public/export.png";
import { useMediaQuery } from "react-responsive";

export default function SlidingBar() {
  const isXs = useMediaQuery({ query: "(max-width: 1110px)" });
  const [isnotTable, setisnotTable] = useState(false);
  useEffect(
    function () {
      setisnotTable(isXs);
    },
    [isXs]
  );
  const [animClass, setanimClass] = useState("move-left");
  return (
    <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
      <div className="flex flex-col max-sm:mt-2 gap-2">
        <div className="flex flex-row max-sm:text-[14px] max-sm:gap-8 gap-6  ">
          <span className="" onClick={() => setanimClass("move-left")}>
            Staff List
          </span>
          <span className="" onClick={() => setanimClass("move-right")}>
            Pending Requests
          </span>
        </div>
        <div className={`w-[250px] items-center  bg-[#C3C2C2] flex h-[1px]`}>
          <div
            id="coolnav"
            className={`w-[100px] ${animClass} h-[3px] bg-[#BED600]`}
          ></div>
        </div>
      </div>
      {!isnotTable && (
        <div className="flex w-[164px] rounded-lg max-sm:hidden hover:scale-105 duration-300 flex-row py-2 px-[40px] text-white bg-[#005A86] justify-between items-center">
          <span> Export </span>
          <Image src={Export} className="w-6 h-6" alt="export" />
        </div>
      )}
    </div>
  );
}
