"use client";

import { Card, CardBody, CardHeader } from "@heroui/card"
import { Button } from "@heroui/button";
import { GiPadlock } from "react-icons/gi";
import { FormProvider, useForm } from "react-hook-form";
import { profileSchema, RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import UserDetailsForm from "./UserDetailsForm";
import { useState } from "react";
import Profileform from "./ProfileForm";
import { registerUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { handleFormServerErrors } from "@/lib/util";
import { ZodIssue } from "zod/v3";

const stepSchema = [registerSchema, profileSchema]

export default function RegisterForm() {
    const router = useRouter()
    const [activeStep, setActiveStep] = useState(0);
    // const currentValidationSchema = stepSchema[activeStep];

    const methods = useForm<RegisterSchema>({
        // resolver: zodResolver(currentValidationSchema),
        mode: 'onTouched'
    });

    const { handleSubmit, getValues, setError, formState: { errors, isValid, isSubmitting } } = methods;

    const onSubmit = async () => {
        const result = await registerUser(getValues())
        if (result.status === "success") {
            router.push("/register/success")
        } else {
            handleFormServerErrors({ error: result.error as ZodIssue[] | string }, setError)
        }
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <UserDetailsForm />
            case 1:
                return <Profileform />
            default:
                return "Unknown step";
        }
    }

    const onBack = () => {
        setActiveStep(s => s - 1)
    }

    const onNext = async () => {
        if (activeStep === stepSchema.length - 1) {
            await onSubmit()
        } else {
            setActiveStep(s => s + 1)
        }
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">Register</h1>
                    </div>
                    <p className="text-neutral-500">Welcome to NextMatch</p>
                </div>
            </CardHeader>
            <CardBody>
                <FormProvider {...methods} >
                    <form onSubmit={handleSubmit(onNext)}>
                        <div className="space-y-4">
                            {getStepContent(activeStep)}
                            {errors.root?.serverError && (
                                <p className="text-danger text-sm">{errors.root.serverError.message}</p>
                            )}
                            <div className="flex flex-row items-center gap-6">
                                {
                                    activeStep !== 0 && (
                                        <Button onPress={onBack} fullWidth>Back</Button>
                                    )
                                }
                                <Button
                                    isDisabled={!isValid} fullWidth
                                    color="secondary" type="submit"
                                    isLoading={isSubmitting}
                                >
                                    {activeStep === stepSchema.length - 1 ? "Submit" : 'Continue'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </CardBody>
        </Card>
    );
}