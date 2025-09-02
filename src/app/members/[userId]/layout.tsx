import { ReactNode } from "react"
import { notFound } from "next/navigation";
import { Card } from "@heroui/card";
import MemberSidebar from "../MemberSidebar";
import { getMemberByUserId } from "@/app/actions/memberActions";

type Props = {
    children: ReactNode,
    params: Promise<{ userId: string }>
}

export default async function Layout({ children, params }: Props) {
    const { userId } = await params;
    const member = await getMemberByUserId(userId);

    if (!member) return notFound();

    return (
        <div className="grid grid-cols-12 gap-5 h-[80vh]">
            <div className="col-span-3">
                <MemberSidebar member={member} />
            </div>
            <div className="col-span-9">
                <Card className="w-full mt-10 h-[80vh]">
                    {children}
                </Card>
            </div>
        </div>
    )
}