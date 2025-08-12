// import React, { useEffect } from "react";
// import Chatuser from "./Chatuser";
// import Messages from "./Messages";
// import Typesend from "./Typesend";
// import useConversation from "../../zustand/useConversation.js";
// import { useAuth } from "../../context/AuthProvider.jsx";

// function Right() {
//   const { selectedConversation, setSelectedConversation } = useConversation();

//   useEffect(() => {
//     return () => setSelectedConversation(null);
//   }, [setSelectedConversation]);

//   return (
//     <div style={{
//       flex: 1,
//       display: "flex",
//       flexDirection: "column",
//       backgroundColor: "#ffffff",
//       height: "100vh"
//     }}>
//       {!selectedConversation ? (
//         <NoChatSelected />
//       ) : (
//         <>
//           <Chatuser />
//           <div style={{ 
//             flex: 1, 
//             overflowY: "auto", 
//             padding: "16px 20px",
//             backgroundColor: "#f8f9fa"
//           }}>
//             <Messages />
//           </div>
//           <Typesend />
//         </>
//       )}
//     </div>
//   );
// }

// export default Right;

// const NoChatSelected = () => {
//   const [authUser] = useAuth();
//   return (
//     <div style={{
//       flex: 1,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#f8f9fa",
//       textAlign: "center",
//       padding: "40px"
//     }}>
//       <div style={{
//         maxWidth: "400px"
//       }}>
//         <div style={{
//           width: "120px",
//           height: "120px",
//           backgroundColor: "#e9ecef",
//           borderRadius: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           margin: "0 auto 24px",
//           fontSize: "48px",
//           color: "#adb5bd"
//         }}>
//           💬
//         </div>
//         <h2 style={{ 
//           fontSize: "24px", 
//           fontWeight: "600",
//           color: "#212529",
//           marginBottom: "12px",
//           margin: 0
//         }}>
//           Welcome, {authUser?.user?.fullname || "User"}!
//         </h2>
//         <p style={{
//           fontSize: "16px",
//           color: "#6c757d",
//           lineHeight: "1.5",
//           margin: "12px 0 0 0"
//         }}>
//           Select a conversation from the sidebar to start chatting with your team members.
//         </p>
//       </div>
//     </div>
//   );
// };






import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff",
      height: "100vh",
      borderLeft: "1px solid #ddd"
    }}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />
          <div style={{ 
            flex: 1, 
            overflowY: "auto", 
            padding: "16px 20px",
            backgroundColor: "#f8f9fa"
          }}>
            <Messages />
          </div>
          <Typesend />
        </>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <div style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      textAlign: "center",
      padding: "40px"
    }}>
      <div style={{
        maxWidth: "400px"
      }}>
        <div style={{
          width: "120px",
          height: "120px",
          backgroundColor: "#e9ecef",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          fontSize: "48px",
          color: "#adb5bd"
        }}>
          💬
        </div>
        <h2 style={{ 
          fontSize: "24px", 
          fontWeight: "600",
          color: "#212529",
          marginBottom: "12px",
          margin: 0
        }}>
          Welcome, {authUser?.user?.fullname || "User"}!
        </h2>
        <p style={{
          fontSize: "16px",
          color: "#6c757d",
          lineHeight: "1.5",
          margin: "12px 0 0 0"
        }}>
          Select a conversation from the sidebar to start chatting with your team members.
        </p>
      </div>
    </div>
  );
};
