'use client'
import { ConfirmationModal } from "@/components";
import { Modal } from "@/components/ModalWrapper";
import UIChecksSVG from "@/components/svg/UIChecks";
import { updateStaffStatus } from "@/lib/admin/staff/action";
import { Account, ACCOUNT_STATUS, Session } from "@/lib/definitions";
import { Select } from "antd";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import StaffTable from "./StaffTable";
import StaffTableMobile from "./StaffTableMobile";
import SearchStaff from "./SearchStaff";

type StaffDataProps = {
    session: Session,
    users: Account[]
}

let actionToExecute: () => void = () => { return }

export default function StaffData({ session, users }: StaffDataProps) {

    // Multiple delete
    const [batchUpdateItems, setBatchUpdateItems] = useState<Set<string>>(new Set());

    // Multiple delete
    const [batchUpdate, setBatchUpdate] = useState<boolean>(false);

    // Cofrimation modal
    const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);

    // Handle batch update click
    function handleBatchUpdateClick() {
        // Add all items to batch items update
        users.forEach(staff => {
            AddBatchUpdateItems(`${staff.id}`);
        })
        setBatchUpdate(prev => !prev)
    }

    function AddBatchUpdateItems(id: string) {
        if (batchUpdateItems.has(id)) {
            setBatchUpdateItems((prev) => {
                prev.add(id);
                return new Set(prev);
            });
            return
        }
        setBatchUpdateItems((prev) => new Set(prev).add(id))
    }

    // Add or remove items marked for update
    function toggleBatchUpdateItem(id: string) {
        if (batchUpdateItems.has(id)) {
            setBatchUpdateItems((prev) => {
                prev.delete(id);
                return new Set(prev);
            });
            return
        }
        setBatchUpdateItems((prev) => new Set(prev).add(id))
    }

    // Update all staff data
    function updateData(status: ACCOUNT_STATUS) {

        const toastId = toast.loading("Updating data...")

        const fetchPromises = Array.from(batchUpdateItems).map(id => {
            return (
                updateStaffStatus(session.token, {
                    userId: parseInt(id),
                    verified: status,
                })
                    .then(response => console.log(response))
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
                        toast.error("An error occurred updating status")
                        console.error(`Error fetching data for ids ${[index]}:`, result.reason);
                    }
                });
                toast.dismiss(toastId);
                toast.success("Updates applied!");
                setBatchUpdate(false);
            });
    }


    function updateSelectedStaffsData(status: ACCOUNT_STATUS) {
        if (batchUpdateItems.size < 1) {
            toast.error("No item selected!");
        }
        actionToExecute = () => updateData(status)
        setConfirmationModalOpen(true);
    }

    return (
        <>
            {/* Search staff */}
            <div className="flex basis-full flex-col sm:flex-row-reverse justify-between gap-y-3 sm:items-end">
                <SearchStaff placeholder="Search Staff..." />

                {/* UI Checks */}
                <div className="flex items-center gap-x-5">
                    <div className={`${batchUpdate && "text-ecobankBlue"} cursor-pointer`} onClick={handleBatchUpdateClick}>
                        <UIChecksSVG width={30} height={30} />
                    </div>

                    {batchUpdate && (
                        <div className="w-[90vw] max-w-[200px]">
                            <Select
                                disabled={!batchUpdate || batchUpdateItems.size < 1}
                                defaultValue={"Select Update Type"}
                                style={{ width: "100%", height: 42, color: "#005A86" }}
                                onChange={e => updateSelectedStaffsData(e as ACCOUNT_STATUS)}
                                options={[
                                    // { value: ACCOUNT_STATUS.PENDING, label: ACCOUNT_STATUS.PENDING },
                                    { value: ACCOUNT_STATUS.APPROVED, label: ACCOUNT_STATUS.APPROVED },
                                    { value: ACCOUNT_STATUS.REJECTED, label: ACCOUNT_STATUS.REJECTED },
                                ]}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="xl:hidden">
                <StaffTableMobile
                    staffData={users}
                    toggleBatchUpdateItem={toggleBatchUpdateItem}
                    session={session} batchUpdate={batchUpdate}
                    batchUpdateItems={batchUpdateItems} />
            </div>
            <div className="hidden xl:block">
                <StaffTable
                    staffData={users}
                    session={session}
                    toggleBatchUpdateItem={toggleBatchUpdateItem}
                    batchUpdate={batchUpdate}
                    batchUpdateItems={batchUpdateItems}
                />
            </div>

            {/* Batch Operation confirmation */}
            {/* Confirmation modal */}
            {confirmationModalOpen && (
                <Modal closeModal={() => {
                    actionToExecute = () => { return }
                    setConfirmationModalOpen(false);
                }} bare >
                    <ConfirmationModal title="Update in batch" desc="Are you sure"
                        next={() => {
                            actionToExecute()
                            // Close modal
                            setConfirmationModalOpen(false);
                        }}

                        svg={"/RemoveBus.svg"}

                        nextButtonText="Continue"

                        cancel={() => {
                            setConfirmationModalOpen(false);
                            actionToExecute = () => { return }
                        }}
                    />
                </Modal>
            )}


            {/* Toast messages */}
            <Toaster />
        </>
    )
}