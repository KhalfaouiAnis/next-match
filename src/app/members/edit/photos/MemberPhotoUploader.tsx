"use client"

import { addImage } from "@/app/actions/userActions";
import ImageUploadButton from "@/components/ImageUploadButton";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function MemberPhotoUploader() {
    const router = useRouter();

    const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === "object") {
            await addImage(result.info.secure_url, result.info.public_id)
            router.refresh()
        } else {
            toast.error("Problem uploding the photo")
        }
    }

    return (
        <div>
            <ImageUploadButton onUploadImage={onAddImage} />
        </div>
    );
}

export default MemberPhotoUploader;