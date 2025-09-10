import { Divider } from "@heroui/divider";
import { getUnapprovedPhotos } from "@/app/actions/adminAction";
import MemberPhotos from "@/components/MemberPhotos";

export const dynamic = "force-dynamic"

async function PhotoModerationPage() {
    const photos = await getUnapprovedPhotos();

    return (
        <div className="flex flex-col mt-10 gap-3">
            <h3 className="text-2xl">Photos awaiting moderation</h3>
            <Divider />
            <MemberPhotos photos={photos} />
        </div>
    );
}

export default PhotoModerationPage;