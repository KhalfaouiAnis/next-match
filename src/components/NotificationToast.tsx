import { transformImageUrl } from "@/lib/util"
import { Image } from "@heroui/image"
import Link from "next/link"

type Props = {
    href: string
    title: string
    image?: string | null,
    subtitle?: string
}

export default function NotificationToast({ image, href, title, subtitle }: Props) {
    return (
        <Link href={href} className="flex items-center" >
            <div className="mr-2">
                <Image
                    src={transformImageUrl(image) || '/images/user.png'}
                    height={50}
                    width={50}
                    alt="Sender image"
                />
            </div>
            <div className="flex flex-1 flex-col justify-center">
                <div className="font-semibold">{title}</div>
                <div className="text-sm">{subtitle || 'Click to view'}</div>
            </div>
        </Link>
    )
}

