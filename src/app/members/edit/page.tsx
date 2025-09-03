import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

export default async function MemberEditPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);

    if (!member) return notFound();

    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Edit rofile
            </CardHeader>
            <Divider />
            <CardBody>
                <EditForm member={member} />
            </CardBody>
        </>
    );
}