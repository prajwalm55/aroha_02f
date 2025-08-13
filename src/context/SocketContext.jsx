// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthProvider";
// import io from "socket.io-client";
// const socketContext = createContext();

// // it is a hook.
// export const useSocketContext = () => {
//   return useContext(socketContext);
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [authUser] = useAuth();

//   useEffect(() => {
//     if (authUser) {
//       const socket = io("http://localhost:4002", {
//         query: {
//           userId: authUser.user._id,
//         },
//       });
//       setSocket(socket);
//       socket.on("getOnlineUsers", (users) => {
//         setOnlineUsers(users);
//       });
//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);
//   return (
//     <socketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </socketContext.Provider>
//   );
// };



//group



import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import useConversation from "../zustand/useConversation";
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();
  const { addMessage, addGroup, updateGroup, removeGroup, selectedConversation, isGroupChat } = useConversation();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:4002", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socket);

      // Existing socket events
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Individual message event
      socket.on("newMessage", (message) => {
        // Only add message if it's for the current conversation
        if (selectedConversation && !isGroupChat && 
            (message.senderId === selectedConversation._id || 
             message.receiverId === selectedConversation._id)) {
          addMessage(message);
        }
      });

      // Group-related socket events
      socket.on("newGroup", (group) => {
        addGroup(group);
      });

      socket.on("newGroupMessage", (data) => {
        const { groupId, ...message } = data;
        // Only add message if it's for the current group conversation
        if (selectedConversation && isGroupChat && selectedConversation._id === groupId) {
          addMessage(message);
        }
      });

      socket.on("addedToGroup", (group) => {
        addGroup(group);
      });

      socket.on("memberAdded", ({ groupId, newMember }) => {
        // You can handle this to show notifications or update group member list
        console.log(`New member ${newMember} added to group ${groupId}`);
      });

      socket.on("removedFromGroup", ({ groupId }) => {
        removeGroup(groupId);
      });

      socket.on("memberRemoved", ({ groupId, removedMember }) => {
        // You can handle this to show notifications or update group member list
        console.log(`Member ${removedMember} removed from group ${groupId}`);
      });

      socket.on("chatCleared", ({ conversationId }) => {
        // Handle chat clearing for both individual and group chats
        if (selectedConversation && selectedConversation._id === conversationId) {
          // Clear messages for current conversation
          setMessages([]);
        }
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, addMessage, addGroup, updateGroup, removeGroup, selectedConversation, isGroupChat]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};