"use client";

import { Photo } from "@/generated/prisma";
import { CldImage } from "next-cloudinary";
import { Image } from "@heroui/image";

type Props = {
    photo: Photo | null
}

function MemberImage({ photo }: Props) {
    return (
        <div>
            {photo?.publicId ?
                (
                    <CldImage priority alt="member image" src={photo.publicId} width={300} height={300} crop="fill" gravity="faces" className="rounded-2xl" />
                ) : (
                    <Image
                        width={220}
                        src={photo?.url || '/images/user.png'}
                        alt="user image"
                    />
                )
            }
        </div>
    );
}

export default MemberImage;