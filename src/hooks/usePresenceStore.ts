import { create } from "zustand";

type PresenceState = {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
};

const usePresenceStore = create<PresenceState>((set) => ({
  members: [],
  add: (id) => set((state) => ({ members: [...state.members, id] })),
  remove: (id) =>
    set((state) => ({ members: state.members.filter((m) => m !== id) })),
  set: (ids) => set({ members: ids }),
}));

export default usePresenceStore;
