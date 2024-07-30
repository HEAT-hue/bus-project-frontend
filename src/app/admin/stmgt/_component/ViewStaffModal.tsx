"use client";
import { updateStaffProfile } from "@/lib/admin/staff/action";
import { Account, ACCOUNT_STATUS, ROLES, Session } from "@/lib/definitions";
import { FetchError } from "@/lib/FetchError";
import classNames from "classnames";
import { CSSProperties, useState } from "react";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast'

// Ant design imports
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

type VeiwStaffModalProp = {
  account: Account;
  session: Session;
  closeModal: () => void;
};

export default function ViewStaffModal({
  account,
  session,
  closeModal,
}: VeiwStaffModalProp) {
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<string>(account.role);
  const [userSpecialNeeds, setUserSpecialNeeds] = useState<boolean>(account.specialNeeds || false);


  // Account Role Items
  const AccountRoleItems: MenuProps["items"] = [
    {
      label: <p onClick={() => handleRoleUpdate(ROLES.USER)}>{ROLES.USER}</p>,
      key: "0",
    },
    {
      label: (
        <p onClick={() => handleRoleUpdate(ROLES.CAPTAIN)}>{ROLES.CAPTAIN}</p>
      ),
      key: "1",
    },
  ];

  const SpecialNeedsItems: MenuProps["items"] = [
    {
      label: <p onClick={() => handleStaffSpecialNeedsUpdate(true)}>YES</p>,
      key: "0",
    },
    {
      label: <p onClick={() => handleStaffSpecialNeedsUpdate(false)}>NO</p>,
      key: "1",
    },
  ];

  function handleStaffUpdate(verified: ACCOUNT_STATUS) {
    // Set button pending state
    setLoading(true);
    (async function () {
      try {
        await updateStaffProfile(session.token, { userId: account.id, }, { verificationStatus: verified });
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

  function handleRoleUpdate(authorities: ROLES) {
    if (authorities == userRole) {
      return;
    }
    (async function () {
      try {
        await updateStaffProfile(session.token, { userId: account.id || 2, }, { role: authorities });
        setUserRole(authorities);
        toast.success("ROLE updated successfully")
      } catch (error) {
        if (error instanceof FetchError) {
          toast.error("Error updating role")
          // setErrorMessage(error.message);
        }
      }
    })();
  }

  function handleStaffSpecialNeedsUpdate(specialNeeds: boolean) {
    // Set button pending state
    setLoading(true);

    (async function () {
      try {
        await updateStaffProfile(session.token, { userId: account.id, }, { specialNeeds });
        setUserSpecialNeeds((prev) => !prev)
        toast.success("Special needs updated successfully")
      } catch (error) {
        if (error instanceof FetchError) {
          toast.error("Error updating special needs");
        }
      } finally {
        setLoading(false);
      }
    })();
  }

  return (
    <div>
      <div className=" p-5 md:p-7 max-h-[90vh] overflow-y-auto">
        <h1 className="text-ecobankBlue text-xl font-Gilroy-Medium text-center ">
          View
        </h1>
        <form onClick={(e) => e.preventDefault()}>
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
                Authority
              </label>
              <Dropdown menu={{ items: AccountRoleItems }} trigger={["click"]}>
                <p>
                  <Space className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue flex justify-between items-center hover:cursor-pointer">
                    {userRole}
                    <DownOutlined className="text-[12px]" />
                  </Space>
                </p>
              </Dropdown>
            </div>

            {/* email */}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="email" className="text-sm">
                Email Address
              </label>
              <input
                value={account.email} placeholder="Email" type="email" disabled name="email" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
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
                disabled
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
                disabled
                className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
              />
            </div>

            {/* Special needs */}
            <div className="flex flex-col gap-y-1">
              <label htmlFor="affiliate" className="text-sm">
                Special needs
              </label>
              <Dropdown menu={{ items: SpecialNeedsItems }} trigger={["click"]}>
                <p>
                  <Space className={`text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border ${userSpecialNeeds ? "border-error" : "border-gray-400"} focus:border-ecobankBlue flex justify-between items-center hover:cursor-pointer`}>
                    {userSpecialNeeds ? "YES" : "NO"}
                    <DownOutlined className="text-[12px]" />
                  </Space>
                </p>
              </Dropdown>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-center mt-9  md:gap-4">
            {loading ? (
              <BeatLoader
                color={"#B3261E"}
                loading={true}
                cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <>
                {userRole == ROLES.USER && (
                  <>
                    {account.verificationStatus != ACCOUNT_STATUS.REJECTED && (
                      <button
                        type="button"
                        onClick={() => handleStaffUpdate(ACCOUNT_STATUS.REJECTED)}
                        className={classNames({
                          "rounded md:px-28 py-3 text-sm text-red-500 border border-red-500 focus:outline-none mt-5 cursor-pointer":
                            true,
                        })}
                      >
                        Reject
                      </button>
                    )}
                    {
                      account.verificationStatus != ACCOUNT_STATUS.APPROVED && (
                        <button
                          type="button"
                          onClick={() => handleStaffUpdate(ACCOUNT_STATUS.APPROVED)}
                          className={classNames({
                            "rounded md:px-28  py-3 text-sm text-white bg-darkBlue focus:outline-none mt-5 cursor-pointer":
                              true,
                          })}
                        >
                          Approve
                        </button>
                      )
                    }
                  </>
                )}
              </>
            )}
          </div>
        </form>
      </div>

      {/* Toast messages */}
      <Toaster />
    </div>
  );
}
