"use client";

import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { format, subYears } from "date-fns";
import { useFormContext } from "react-hook-form";

export default function ProfileForm() {
    const { register, setValue, formState: { errors } } = useFormContext()

    const genderList = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ]

    return (
        <div className="space-y-4">
            <Select
                defaultSelectedKeys={[""]}
                label="Gender"
                aria-label="select gender"
                variant="bordered"
                {...register("gender")}
                isInvalid={!!errors.gender}
                errorMessage={errors.gender?.message as string}
                onChange={e => setValue('gender', e.target.value)}
            >
                {
                    genderList.map(g => (
                        <SelectItem key={g.value}>
                            {g.label}
                        </SelectItem>
                    ))
                }
            </Select>
            <Input
                defaultValue=""
                label="Date of birth"
                type="date"
                variant="bordered"
                max={format(subYears(new Date(), 18), 'yyyy-mm-dd')}
                {...register("dateOfBirth")}
                isInvalid={!!errors.dateOfBirth}
                errorMessage={errors.dateOfBirth?.message as string}
            />
            <Textarea
                defaultValue=""
                label="Description"
                variant="bordered"
                {...register("description")}
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message as string}
            />
            <Input
                defaultValue=""
                label="City"
                variant="bordered"
                {...register("city")}
                isInvalid={!!errors.city}
                errorMessage={errors.city?.message as string}
            />
            <Input
                defaultValue=""
                label="Country"
                variant="bordered"
                {...register("country")}
                isInvalid={!!errors.country}
                errorMessage={errors.country?.message as string}
            />
            {errors.root?.serverError && (
                <p className="text-danger text-sm">{errors.root.serverError.message}</p>
            )}
        </div>
    );
}