import { MessageDto } from "@/types";
import { create } from "zustand";

type MessageState = {
  messages: MessageDto[];
  unreadCount: number;
  add: (message: MessageDto) => void;
  remove: (id: string) => void;
  set: (messages: MessageDto[]) => void;
  updateUnreadCount: (amount: number) => void;
  resetMessages: () => void;
};

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  unreadCount: 0,
  add: (message) =>
    set((state) => ({ messages: [message, ...state.messages] })),
  remove(id) {
    return set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    }));
  },
  set(messages) {
    return set((state) => {
      const map = new Map(
        [...state.messages, ...messages].map((m) => [m.id, m])
      );
      const uniqueMesages = Array.from(map.values());

      return { messages: uniqueMesages };
    });
  },
  updateUnreadCount(amount) {
    return set((state) => ({ unreadCount: state.unreadCount + amount }));
  },
  resetMessages() {
    return set({ messages: [] });
  },
}));
