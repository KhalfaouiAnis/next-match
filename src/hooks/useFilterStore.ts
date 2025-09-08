import { UserFilters } from "@/types";
import { create } from "zustand";

type FilterState = {
  filters: UserFilters;
  setFilters: (
    filterName: keyof FilterState["filters"],
    value: string | number[] | string[]
  ) => void;
};

const useFilterStore = create<FilterState>((set) => ({
  filters: {
    ageRange: [18, 99],
    gender: ["male", "female"],
    orderBy: "updated",
  },
  setFilters(filterName, value) {
    return set((state) => ({
      filters: { ...state.filters, [filterName]: value },
    }));
  },
}));

export default useFilterStore;
