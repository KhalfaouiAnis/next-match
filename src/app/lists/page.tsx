import { fetchCurrentUserLikeIds, fetchLikedMembers } from "../actions/likeActions";
import ListTabs from "./ListTabs";

export default async function ListsPage({ searchParams }: { searchParams: Promise<{ type: string }> }) {
    const { type } = await searchParams;
    const likeIds = await fetchCurrentUserLikeIds();
    const members = await fetchLikedMembers(type)

    return (
        <div>
            <ListTabs members={members} likeIds={likeIds} />
        </div>
    );
}