import { PagingResult } from "@/types";
import { create } from "zustand";

type PaginationState = {
  pagination: PagingResult;
  setPagination: (count: number) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

export const usePaginationStore = create<PaginationState>((set) => ({
  pagination: {
    pageNumber: 1,
    pageSize: 12,
    totalCount: 0,
    totalPages: 1,
  },
  setPagination(totalCount) {
    return set((state) => ({
      pagination: {
        pageNumber: 1,
        pageSize: state.pagination.pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / state.pagination.pageSize),
      },
    }));
  },
  setPage(page) {
    return set((state) => ({
      pagination: {
        ...state.pagination,
        pageNumber: page,
      },
    }));
  },
  setPageSize(pageSize) {
    return set((state) => ({
      pagination: {
        ...state.pagination,
        pageSize: pageSize,
        pageNumber: 1,
        totalPages: Math.ceil(
          state.pagination.totalCount / state.pagination.pageSize
        ),
      },
    }));
  },
}));
