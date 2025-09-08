"use client"

import CardWrapper from "@/components/CardWrapper";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

function RegisterSuccessPage() {
    const router = useRouter()
    return (
        <CardWrapper
            headerText="Success"
            subHeaderText="You can now login to th app"
            action={() => router.push("/login")}
            actionLabel="Go to login"
            headerIcon={FaCheckCircle}
        />
    );
}

export default RegisterSuccessPage;