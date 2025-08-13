import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();

      setMessages((prevMessages) => {
        // If message already exists (by _id), don't add it again
        const exists = prevMessages.some((msg) => msg._id === newMessage._id);
        if (exists) return prevMessages;

        return [...prevMessages, newMessage];
      });
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, setMessages]);
};

export default useGetSocketMessage;
