import { Fragment } from "react";
import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";
import PaginationComponent from "@/components/PaginationComponent";
import { GetMemberParams } from "@/types";
import EmptyState from "@/components/EmptyState";

export default async function MembersPage({ searchParams }: { searchParams: Promise<GetMemberParams> }) {
    const filterParams = await searchParams;
    const { items, totalCount } = await getMembers(filterParams);
    const likeIds = await fetchCurrentUserLikeIds();

    return !items || items.length === 0 ? (
        <EmptyState />
    ) : (
        <Fragment>
            <div className="p-6 mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                {items && items.map(member => (
                    <MemberCard key={member.id} member={member} likeIds={likeIds} />
                ))}
            </div>
            <PaginationComponent totalCount={totalCount} />
        </Fragment>

    );
}