"use client";
import { BsCheck } from "react-icons/bs";
import { Account, ACCOUNT_STATUS, Session } from "@/lib/definitions";
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import ViewStaffModal from "./ViewStaffModal";
import { Modal } from "@/components/ModalWrapper";

type StaffTableMobileProps = {
  staffData: Account[];
  session: Session
  batchUpdate: boolean
  toggleBatchUpdateItem(id: string): void,
  batchUpdateItems: Set<string>
};

export default function StaffTableMobile({
  staffData,
  session,
  batchUpdate,
  toggleBatchUpdateItem,
  batchUpdateItems,
}: StaffTableMobileProps) {

  const [openModal, setOpenModal] = useState<Account | undefined>(undefined);

  return (
    <div>
      <div className="divide-y divide-gray-200">
        {staffData.map((user, index) => {
          return (
            <div
              onClick={() => {
                if (!batchUpdate) {
                  setOpenModal(user);
                  return;
                }
                toggleBatchUpdateItem(`${user.id}`)
              }}
              key={index}
              // className="py-2 "
              className={classNames({
                " bbg-gradient-to-br from-white to-[#3C8930]/5 text-green-800":
                  user.verified.toUpperCase() == ACCOUNT_STATUS.ACCEPTED,
                " bbg-gradient-to-br from-white to-[#3C8930]/5 text-green-700":
                  user.verified.toUpperCase() == ACCOUNT_STATUS.APPROVED,
                " bbg-gradient-to-br from-white to-[#3C8930]/5 text-yellow-700":
                  user.verified.toUpperCase() == ACCOUNT_STATUS.PENDING,
                " bbg-gradient-to-br from-white to-[#B3261E]/5 text-error":
                  user.verified.toUpperCase() == ACCOUNT_STATUS.REJECTED,
                "p-2 flex gap-x-4 items-center": true,
              })}
            >
              {batchUpdate ? (
                <div className={`w-[20px] h-[20px] ${batchUpdateItems.has(`${user.id}`) ? "bg-ecobankBlue" : "bg-gray-500"} flex items-center justify-center rounded-sm`}>
                  <BsCheck className="text-white" size={20} />
                </div>) : (
                null
                // <span className="w-[20px]">{index + 1}</span>
              )}
              <div className="w-full flex flex-col gap-y-1 cursor-pointer">
                <div className="flex justify-between">
                  <p>
                    <span className="text-gray-500">Name:</span>{" "}
                    <span className="text-sm">{user.firstName}</span>
                  </p>
                  <div className=" flex justify-center items-center font-Gilroy-SemiBold whitespace-nowrap ">
                    <div
                      className={classNames({
                        " text-[#3C8930] bg-[#3C8930]/40":
                          user.verified == ACCOUNT_STATUS.APPROVED,
                        " text-[#3C8930] bg-[#3C8930]/50":
                          user.verified.toUpperCase() ==
                          ACCOUNT_STATUS.ACCEPTED,
                        " text-[#a6b40c] bg-[#d5e80b]/40":
                          user.verified.toUpperCase() == ACCOUNT_STATUS.PENDING,
                        " text-[#B3261E] bg-[#B3261E]/40":
                          user.verified.toUpperCase() ==
                          ACCOUNT_STATUS.REJECTED,
                        "flex justify-center items-center max-w-[130px]  py-1 px-2 rounded w-full text-xs":
                          true,
                      })}
                    >
                      {user.verified.toLocaleUpperCase()}
                    </div>
                  </div>
                </div>
                <p>
                  <span className="text-gray-500">Staff ID: </span>{" "}
                  <span className="text-sm">{user.staff_id}</span>
                </p>
                <p>
                  <span className="text-gray-500">Department: </span>{" "}
                  <span className="text-sm">{user.department}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show update staff modal  */}
      {openModal && (
        <Modal closeModal={() => setOpenModal(undefined)}>
          <ViewStaffModal session={session} account={openModal} closeModal={() => setOpenModal(undefined)} />
        </Modal>
      )}
    </div>
  );
}
