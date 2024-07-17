"use client";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
// import { useMediaQuery } from "react-responsive";

export default function SlidingBar({
  sections,
  children,
}: {
  sections: [string, string] | [string];
  children: ReactNode;
}) {
  // const isXs = useMediaQuery({ query: "(max-width: 1110px)" });
  // const [isnotTable, setisnotTable] = useState(false);
  // useEffect(
  //   function () {
  //     setisnotTable(isXs);
  //   },
  //   [isXs]
  // );
  const [animClass, setanimClass] = useState("move-left");
  return (
    <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
      <div className="flex flex-col max-sm:mt-2 gap-2">
        <div className="flex flex-row max-sm:text-[14px] max-sm:gap-8 gap-6  ">
          {sections.length === 2 ? (
            <>
              <span
                className=""
                onClick={() => {
                  setanimClass("move-left");
                }}
              >
                {sections[0]}
              </span>
              <span className="" onClick={() => setanimClass("move-right")}>
                {sections[1]}
              </span>
            </>
          ) : sections.length === 1 ? (
            <span className="">{sections[0]}</span>
          ) : (
            <div></div>
          )}
        </div>
        <div className={`w-[250px] items-center  bg-[#C3C2C2] flex h-[1px]`}>
          {sections.length === 2 && (
            <div
              id="coolnav"
              className={`w-[100px] ${animClass} h-[3px] bg-[#BED600]`}
            ></div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
