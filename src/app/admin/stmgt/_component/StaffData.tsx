'use client'
import { Account, Session } from "@/lib/definitions";
import StaffTable from "./StaffTable";
import StaffTableMobile from "./StaffTableMobile";
import { useState } from "react";

type StaffDataProps = {
    session: Session,
    users: Account[]
}

export default function StaffData({ session, users }: StaffDataProps) {

    // Multiple delete
    const [batchUpdateItems, setBatchUpdateItems] = useState<Set<string>>(new Set());

    // Multiple delete
    const [batchDelete, setBatchDelete] = useState<boolean>(false);

    // Toggle the delete functionality
    function toggleBatchUpdate() {
        if (batchUpdateItems.size == 0) {
            setBatchDelete(!batchDelete)
            return;
        }

        // If there are items to delete, delete them
        // setDeleteItemsModal(true);
    }

    // Add or remove items marked for deletion
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


    return (
        <>

            <div className="xl:hidden">
                <StaffTableMobile staffData={users} session={session} />
            </div>
            <div className="hidden xl:block">
                <StaffTable staffData={users} session={session} />
            </div>
        </>
    )
}