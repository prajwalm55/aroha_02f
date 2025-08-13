// import { create } from "zustand";

// const useConversation = create((set) => ({
//   selectedConversation: null,
//   setSelectedConversation: (selectedConversation) =>
//     set({ selectedConversation }),

//   messages: [],
//   setMessages: (messagesUpdater) =>
//     set((state) => ({
//       messages:
//         typeof messagesUpdater === "function"
//           ? messagesUpdater(state.messages)
//           : messagesUpdater,
//     })), // ✅ Works for both replace and append
//   addMessage: (message) =>
//     set((state) => ({ messages: [...state.messages, message] })),
// }));

// export default useConversation;





// group





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
    })),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  // New group-related state
  groups: [],
  setGroups: (groups) => set({ groups }),
  
  addGroup: (group) =>
    set((state) => ({ groups: [...state.groups, group] })),

  updateGroup: (groupId, updatedGroup) =>
    set((state) => ({
      groups: state.groups.map(group => 
        group._id === groupId ? { ...group, ...updatedGroup } : group
      )
    })),

  removeGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.filter(group => group._id !== groupId)
    })),

  // New state to track if current conversation is a group
  isGroupChat: false,
  setIsGroupChat: (isGroup) => set({ isGroupChat: isGroup }),

  // Clear conversation when switching between users/groups
  clearConversation: () => set({ 
    selectedConversation: null, 
    messages: [], 
    isGroupChat: false 
  }),
}));

export default useConversation;