import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId, getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { notFound } from "next/navigation";
import MemberPhotoUploader from "./MemberPhotoUploader";
import MemberPhotos from "@/components/MemberPhotos";

async function PhotosPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId)
    const photos = await getMemberPhotosByUserId(userId);

    if (!photos) return notFound();

    return (
        <>
            <CardHeader className="flex flex-row justify-between items-center">
                <div className="text-2xl font-semibold text-secondary">
                    Edit Photos
                </div>
                <MemberPhotoUploader />
            </CardHeader>
            <Divider />
            <CardBody>
                <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image} />
            </CardBody>
        </>
    );
}

export default PhotosPage;