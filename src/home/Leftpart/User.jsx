import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        borderRadius: "8px",
        backgroundColor: isSelected ? "#e0e7ff" : "transparent",
        cursor: "pointer",
        marginBottom: "2px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = "#f3f4f6";
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {/* Avatar with Initial */}
      <div style={{ position: "relative", marginRight: "12px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "#8b5cf6",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          {user.fullname?.charAt(0) || "U"}
        </div>
        {isOnline && (
          <div
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "12px",
              height: "12px",
              backgroundColor: "#4ade80",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        )}
      </div>

      {/* Name & Status */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: "500",
            fontSize: "15px",
            color: "#111827",
            marginBottom: "2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {user.fullname}
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "#6b7280",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {isOnline ? "Online" : "Last seen recently"}
        </div>
      </div>

      {/* Time + Unread */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <span style={{ fontSize: "12px", color: "#6b7280" }}>
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        {user.unreadCount > 0 && (
          <span
            style={{
              backgroundColor: "#8b5cf6",
              color: "white",
              fontSize: "11px",
              padding: "2px 6px",
              borderRadius: "999px",
              marginTop: "4px",
            }}
          >
            {user.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default User;
