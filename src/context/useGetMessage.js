// import React, { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation.js";
// import axios from "axios";
// const useGetMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessage, selectedConversation } = useConversation();

//   useEffect(() => {
//     const getMessages = async () => {
//       setLoading(true);
//       if (selectedConversation && selectedConversation._id) {
//         try {
//           const res = await axios.get(
//             `/api/message/get/${selectedConversation._id}`
//           );
//           setMessage(res.data);
//           setLoading(false);
//         } catch (error) {
//           console.log("Error in getting messages", error);
//           setLoading(false);
//         }
//       }
//     };
//     getMessages();
//   }, [selectedConversation, setMessage]);
//   return { loading, messages };
// };

// export default useGetMessage;





import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          setMessages(res.data); // ✅ updated name
        } catch (error) {
          console.error("Error in getting messages", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);

  return { loading, messages };
};

export default useGetMessage;
