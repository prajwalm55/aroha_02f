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
      backgroundColor: "#fafafa",
      height: "100vh",
      borderLeft: "1px solid #e5e5e7"
    }}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />
          <div style={{ 
            flex: 1,
            overflowY: "auto",
            padding: "25px 25px",
            backgroundColor: "#fafafa"
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
      backgroundColor: "#fafafa",
      textAlign: "center",
      padding: "60px 40px"
    }}>
      <div style={{
        maxWidth: "500px"
      }}>
        <div style={{
          width: "140px",
          height: "140px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 32px",
          fontSize: "60px",
          color: "white",
          boxShadow: "0 12px 40px rgba(102, 126, 234, 0.3)"
        }}>
          💬
        </div>
        <h2 style={{ 
          fontSize: "32px",
          fontWeight: "700",
          color: "#1d1d1f",
          marginBottom: "16px",
          margin: "0 0 16px 0",
          letterSpacing: "-0.8px"
        }}>
          Welcome, {authUser?.user?.fullname || "User"}!
        </h2>
        <p style={{
          fontSize: "18px",
          color: "#86868b",
          lineHeight: "1.6",
          margin: "0",
          fontWeight: "400"
        }}>
          Select a conversation from the sidebar to start chatting with your team members.
        </p>
      </div>
    </div>
  );
};

