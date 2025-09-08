"use client";

import { usePaginationStore } from "@/hooks/usePaginationStore";
import { Pagination } from "@heroui/pagination";
import clsx from "clsx";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function PaginationComponent({ totalCount }: { totalCount: number }) {
    const { setPage, setPageSize, setPagination, pagination } = usePaginationStore(useShallow(state => state))
    const { pageNumber, pageSize, totalPages } = pagination

    const start = (pageNumber - 1) * pageSize + 1;
    const end = Math.min(pageNumber * pageSize, totalCount);
    const resultText = `Showing ${start} - ${end} of ${totalCount} results`

    useEffect(() => { setPagination(totalCount) }, [setPagination, totalCount])

    return (
        <div className="p-6 border-t-2 w-full mt-5">
            <div className="flex flex-row justify-between items-center py-5">
                <div>{resultText}</div>
                <Pagination
                    total={totalPages}
                    color="secondary"
                    initialPage={pageNumber}
                    onChange={setPage}
                    variant="bordered"
                />

                <div className="flex flex-row gap-1 items-center">
                    Page size:
                    {[3, 6, 12].map(size => (
                        <div key={size}
                            onClick={() => setPageSize(size)}
                            className={clsx('page-size-box', {
                                'bg-secondary text-white hover:bg-secondary hover:text-white': pageSize === size
                            })}>
                                {size}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}