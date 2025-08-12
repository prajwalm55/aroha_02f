import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  messages: [],
  setMessages: (messagesUpdater) =>
    set((state) => ({
      messages:
        typeof messagesUpdater === "function"
          ? messagesUpdater(state.messages)
          : messagesUpdater,
    })), // ✅ Works for both replace and append
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));

export default useConversation;

