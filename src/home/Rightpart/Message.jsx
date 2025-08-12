import React from "react";
import useConversation from "../../zustand/useConversation.js";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const { selectedConversation } = useConversation();
  const itsMe = message.senderId === authUser.user._id;

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const avatarColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  ];

  const getAvatarColor = (name) => {
    const index = name ? name.charCodeAt(0) % avatarColors.length : 0;
    return avatarColors[index];
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: itsMe ? "flex-end" : "flex-start",
      marginBottom: "20px",
      alignItems: "flex-end"
    }}>
      {/* Avatar for received messages */}
      {!itsMe && (
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: getAvatarColor(selectedConversation.fullname),
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
            marginRight: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            flexShrink: 0
          }}
        >
          {selectedConversation.fullname?.charAt(0) || "U"}
        </div>
      )}
             
      <div style={{
        maxWidth: "65%",
        display: "flex",
        flexDirection: "column",
        alignItems: itsMe ? "flex-end" : "flex-start"
      }}>
        <div style={{
          backgroundColor: itsMe ? "#007aff" : "#ffffff",
          color: itsMe ? "#ffffff" : "#1d1d1f",
          padding: "12px 16px",
          borderRadius: itsMe ? "20px 20px 6px 20px" : "20px 20px 20px 6px",
          boxShadow: itsMe ? "0 2px 12px rgba(0, 122, 255, 0.3)" : "0 2px 12px rgba(0, 0, 0, 0.08)",
          fontSize: "15px",
          lineHeight: "1.4",
          wordWrap: "break-word",
          border: itsMe ? "none" : "1px solid #f0f0f5",
          position: "relative"
        }}>
          {message.message}
        </div>
                
        <div style={{
          fontSize: "12px",
          color: "#86868b",
          marginTop: "6px",
          paddingLeft: itsMe ? "0" : "16px",
          paddingRight: itsMe ? "16px" : "0",
          fontWeight: "500"
        }}>
          {formattedTime}
        </div>
      </div>

      {/* Avatar for sent messages */}
      {itsMe && (
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: getAvatarColor(authUser.user.fullname),
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
            marginLeft: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            flexShrink: 0
          }}
        >
          {authUser.user.fullname?.charAt(0) || "U"}
        </div>
      )}
    </div>
  );
}

export default Message;
