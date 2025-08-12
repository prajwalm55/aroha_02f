// import React, { useState } from "react";
// import useConversation from "../zustand/useConversation.js";
// import axios from "axios";
// const useSendMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessage, selectedConversation } = useConversation();
//   const sendMessages = async (message) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `/api/message/send/${selectedConversation._id}`,
//         { message }
//       );
//       setMessage([...messages, res.data]);
//       setLoading(false);
//     } catch (error) {
//       console.log("Error in send messages", error);
//       setLoading(false);
//     }
//   };
//   return { loading, sendMessages };
// };

// export default useSendMessage;





import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation(); // ✅ Correct setter

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );
      // ✅ Use functional update to avoid stale state
      setMessages((prevMessages) => [...prevMessages, res.data]);
    } catch (error) {
      console.log("Error in send messages", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
