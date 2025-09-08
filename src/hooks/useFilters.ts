import { usePathname, useRouter } from "next/navigation";
import { FaFemale, FaMale } from "react-icons/fa";
import useFilterStore from "./useFilterStore";
import { useShallow } from "zustand/shallow";
import { ChangeEvent, useEffect, useTransition } from "react";
import { Selection } from "@heroui/react";
import { usePaginationStore } from "./usePaginationStore";

export const useFilters = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { filters, setFilters } = useFilterStore(useShallow((state) => state));
  const {
    pagination: { pageNumber, pageSize, totalCount },
    setPage,
  } = usePaginationStore(useShallow((state) => state));
  const { gender, ageRange, orderBy, withPhoto } = filters;

  useEffect(() => {
    if (gender || ageRange || orderBy || withPhoto) {
      setPage(1);
    }
  }, [setPage, ageRange, gender, orderBy, withPhoto]);

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams();

      if (gender) params.set("gender", gender.join(","));
      if (ageRange) params.set("ageRange", ageRange.toString());
      if (orderBy) params.set("orderBy", orderBy);
      if (pageSize) params.set("pageSize", pageSize.toString());
      if (pageNumber) params.set("pageNumber", pageNumber.toString());
      params.set("withPhoto", withPhoto.toString());

      router.replace(`${pathname}?${params}`);
    });
  }, [
    ageRange,
    gender,
    orderBy,
    pathname,
    router,
    pageSize,
    pageNumber,
    withPhoto,
  ]);

  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const handleAgeSelect = (value: number[]) => {
    setFilters("ageRange", value);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      setFilters("orderBy", value.values().next().value as string);
    }
  };

  const handleGenderSelect = (value: string) => {
    if (gender.includes(value)) {
      setFilters(
        "gender",
        gender.filter((g) => g !== value)
      );
    } else {
      setFilters("gender", [...gender, value]);
    }
  };

  const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters("withPhoto", e.target.checked as unknown as string);
  };

  return {
    orderByList,
    genderList,
    isPending,
    filters,
    totalCount,
    selectAge: handleAgeSelect,
    selectGender: handleGenderSelect,
    selectOrder: handleOrderSelect,
    selectWithPhoto: handleWithPhotoToggle,
  };
};
