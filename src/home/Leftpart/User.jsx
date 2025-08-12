import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  // Using actual user profile images or fallback to colored avatars
  const getInitials = (name) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const avatarColors = [
    '#ff7a55', // Orange from palette
    '#7678ed', // Blue from palette  
    '#202022', // Dark from palette
    '#f9fafc', // Light from palette
  ];

  const getAvatarColor = (name) => {
    if (!name) return avatarColors[0];
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  // Sample messages for demo
  const getLastMessage = (userName) => {
    const messages = {
      "Osman Campos": "You: Hey! We are read...",
      "Jayden Church": "I prepared some varia...",
      "Jacob Mclead": "And send me the photo...",
      "Jasmin Lowery": "You: Old Let's discuss it on th...",
      "Zaid Myers": "You: Hey! We are ready to in...",
      "Anthony Cordanes": "What do you think?",
      "Conner Garcia": "You: I think it would be perfe...",
      "Vanessa Cox": "Voice message"
    };
    return messages[userName] || "Last message preview...";
  };

  const getMessageTime = (userName) => {
    const times = {
      "Osman Campos": "20m",
      "Jayden Church": "1h", 
      "Jacob Mclead": "10m",
      "Jasmin Lowery": "20m",
      "Zaid Myers": "45m",
      "Anthony Cordanes": "1d",
      "Conner Garcia": "2d",
      "Vanessa Cox": "2d"
    };
    return times[userName] || "now";
  };

  const hasUnread = (userName) => {
    return ["Jacob Mclead", "Design chat"].includes(userName);
  };

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        borderRadius: "12px",
        backgroundColor: isSelected ? "white" : "transparent",
        cursor: "pointer",
        margin: "1px 0",
        transition: "all 0.2s ease",
        boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.05)" : "none"
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.5)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      {/* Avatar */}
      <div style={{ position: "relative", marginRight: "12px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: getAvatarColor(user.fullname),
            color: getAvatarColor(user.fullname) === '#f9fafc' ? '#202022' : 'white',
            fontWeight: "600",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: getAvatarColor(user.fullname) === '#f9fafc' ? '1px solid #e5e5e7' : 'none'
          }}
        >
          {getInitials(user.fullname)}
        </div>
        
        {/* Online indicator */}
        {isOnline && (
          <div
            style={{
              position: "absolute",
              bottom: "-2px",
              right: "-2px",
              width: "16px",
              height: "16px",
              backgroundColor: "#34c759",
              borderRadius: "50%",
              border: "2px solid #f9fafc"
            }}
          />
        )}
        
        {/* Unread indicator */}
        {hasUnread(user.fullname) && (
          <div
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "12px",
              height: "12px",
              backgroundColor: "#ff7a55",
              borderRadius: "50%",
              border: "2px solid #f9fafc"
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Name and Time Row */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "4px" 
        }}>
          <span
            style={{
              fontWeight: "600",
              fontSize: "15px",
              color: "#1d1d1f",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {user.fullname}
          </span>
          <span style={{ 
            fontSize: "13px", 
            color: "#86868b",
            fontWeight: "400",
            flexShrink: 0,
            marginLeft: "8px"
          }}>
            {getMessageTime(user.fullname)}
          </span>
        </div>

        {/* Message Preview Row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span
            style={{
              fontSize: "14px",
              color: "#86868b",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
              lineHeight: "1.2"
            }}
          >
            {getLastMessage(user.fullname)}
          </span>
          
          {/* Message status indicators */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "4px",
            marginLeft: "8px",
            flexShrink: 0
          }}>
            {/* Read receipts */}
            {["Jasmin Lowery", "Zaid Myers"].includes(user.fullname) && (
              <span style={{ fontSize: "12px" }}>✓</span>
            )}
            {/* Attachment indicator */}
            {user.fullname === "Jacob Mclead" && (
              <span style={{ fontSize: "12px", color: "#86868b" }}>📎</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;