"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

import { ChangeEvent } from "react";
import { Select } from "antd";
import { ACCOUNT_STATUS } from "@/lib/definitions";

export default function SearchStaff({ placeholder }: { placeholder: string }) {

    // Get page search params
    const searchParams = useSearchParams();

    // Get current base url
    // its a client component that can be used anywhere. We need to programatically get the current path name
    const pathname = usePathname();

    // To replace the current url
    const { replace } = useRouter();

    // Debounce handle search to reduce rate at which a function fires
    const handleSearch = useDebouncedCallback((term: string) => {
        // Create new url
        const params = new URLSearchParams(searchParams);

        // Set page to 0 when user types new search query
        params.set('page', '0');

        // set the query
        if (term) {
            params.set('name', term);
        }
        else {
            params.delete('name');
        }

        // Replace current url with generated new one
        replace(`${pathname}?${params.toString()}`)
    }, 600)


    // Fetch buses based on status
    const handleChange = (status: string) => {
        // Create new url
        const params = new URLSearchParams(searchParams);

        // // Set page to 1 when user types new search query
        // params.set('page', '1');

        // set the query
        if (status) {
            params.set('verificationStatus', status);
        }
        else {
            params.delete('verificationStatus');
        }

        // Replace current url with generated new one
        replace(`${pathname}?${params.toString()}`)
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-[90vw] max-w-[200px]">
                <Select
                    defaultValue={"Select status"}
                    style={{ width: "100%", height: 42, color: "#005A86" }}
                    onChange={handleChange}
                    options={[
                        { value: "", label: "ALL" },
                        { value: ACCOUNT_STATUS.PENDING, label: ACCOUNT_STATUS.PENDING },
                        { value: ACCOUNT_STATUS.APPROVED, label: ACCOUNT_STATUS.APPROVED },
                        { value: ACCOUNT_STATUS.REJECTED, label: ACCOUNT_STATUS.REJECTED },
                    ]}
                />
            </div>

            <input
                type="text"
                className="p-2 border-[1.4px] border-gray-300 rounded w-[90vw] max-w-[400px] focus:outline-none focus:border-ecobankBlue text-gray-500" placeholder={placeholder}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleSearch(e.target.value)
                }}
                defaultValue={searchParams.get('filter')?.toString()}
            />
        </div>
    );
}
