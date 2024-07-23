"use client";
import { updateStaffStatus } from "@/lib/admin/staff/action";
import { Account, Session } from "@/lib/definitions";
import { FetchError } from "@/lib/FetchError";
import classNames from "classnames";
import { CSSProperties, useState } from "react";
import { BeatLoader } from "react-spinners";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

type VeiwStaffModalProp = {
  account: Account;
  session: Session
  closeModal: () => void
};

export default function ViewStaffModal({ account, session, closeModal }: VeiwStaffModalProp) {
  const [loading, setLoading] = useState(false);

  
  function handleStaffUpdate(verified: boolean) {
    // Set button pending state
    setLoading(true);

    (async function () {
      try {
        await updateStaffStatus(session.token, { userId: account.id, verified });
        
        closeModal();
      } catch (error) {
        // Clear pending state
        if (error instanceof FetchError) {
          // setErrorMessage(error.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }


  return (
    <div>
      <div className="p-7">
        <h1 className="text-ecobankBlue text-xl font-Gilroy-Medium text-center ">
          View
        </h1>
        <form onClick={e => e.preventDefault()}>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name*/}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                value={account.firstName}
                disabled
                placeholder="Name"
                type="text"
                name="name"
                className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
              />
            </div>

            {/* Staff Id */}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="staf ID" className="text-sm">
                Staff ID
              </label>
              <input
                value={account.staff_id}
                disabled
                placeholder="Staff Id"
                type="text"
                name="staff ID"
                className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
              />
            </div>

            {/* Affiliate */}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="affiliate" className="text-sm">
                Affiiate
              </label>
              <input
                value={account.affiliate}
                placeholder="Affiliate"
                type="text"
                name="affiliate"
                className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
              />
            </div>

            {/* email */}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="email" className="text-sm">
                Email Address
              </label>
              <input
                value={account.email}
                placeholder="Email"
                type="email"
                name="email"
                className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
              />
            </div>

            {/* Dept */}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="department" className="text-sm">
                Department
              </label>
              <input
                value={account.department}
                placeholder="Department"
                type="text"
                name="department"
                className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
              />
            </div>

            {/*Phone number*/}

            <div className="flex flex-col gap-y-1">
              <label htmlFor="route" className="text-sm">
                Phone Number
              </label>
              <input
                value={account.telephone}
                placeholder="Department"
                type="text"
                name="route"
                className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
              />
            </div>
          </div>

          <div className="w-full flex justify-center mt-9 gap-4">
            <button
              type="button"
              onClick={() => handleStaffUpdate(false)}
              className={classNames({
                "rounded px-32 py-3 text-sm text-red-500 border border-red-500 focus:outline-none mt-5 cursor-pointer":
                  true,
              })}
            >
              {loading ? (
                <BeatLoader
                  color={"#ffffff"}
                  loading={true}
                  cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Reject"
              )}
            </button>
            <button
              type="button"
              onClick={() => handleStaffUpdate(true)}
              className={classNames({
                "rounded px-32 py-3 text-sm text-white bg-darkBlue focus:outline-none mt-5 cursor-pointer":
                  true,
              })}
            >
              {loading ? (
                <BeatLoader
                  color={"#ffffff"}
                  loading={true}
                  cssOverride={override}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Approve"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
