'use client'

import { Account, BUS_OPERATIONAL_STATUS } from "@/lib/definitions";
import { Select } from "antd";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useDebouncedCallback } from "use-debounce";

type SelectCaptainProp = {
    captains: Account[]
    setCaptain: Dispatch<SetStateAction<Account | null>>
}

export default function SelectCaptain({ captains }: SelectCaptainProp) {

    console.log(captains);

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="min-w-[200px]">
                <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Select a person"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        { value: '1', label: 'Jack' },
                        { value: '2', label: 'Lucy' },
                        { value: '3', label: 'Tom' },
                    ]}
                />
            </div>
        </div>
    );
}