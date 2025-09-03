import { ReactNode } from "react"
import { notFound } from "next/navigation";
import { Card } from "@heroui/card";
import MemberSidebar from "../MemberSidebar";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { getAuthUserId } from "@/app/actions/authActions";

type Props = {
    children: ReactNode,
}

export default async function Layout({ children }: Props) {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    
    if (!member) return notFound();

    const basePath = `/members/edit`;

    const navLinks = [
        { name: 'Edit profile', href: `${basePath}` },
        { name: 'Update photos', href: `${basePath}/photos` },
    ]

    return (
        <div className="grid grid-cols-12 gap-5 h-[80vh]">
            <div className="col-span-3">
                <MemberSidebar member={member} navLinks={navLinks} />
            </div>
            <div className="col-span-9">
                <Card className="w-full mt-10 h-[80vh]">
                    {children}
                </Card>
            </div>
        </div>
    )
}