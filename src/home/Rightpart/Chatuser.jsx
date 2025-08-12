// claude u

import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { FiPhone, FiVideo, FiMoreHorizontal } from "react-icons/fi";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(selectedConversation._id);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      borderBottom: "1px solid #e9ecef",
      backgroundColor: "#ffffff"
    }}>
      {/* User Info */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative", marginRight: "12px" }}>
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
          {isOnline && (
            <div style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "12px",
              height: "12px",
              backgroundColor: "#4ade80",
              borderRadius: "50%",
              border: "2px solid white"
            }} />
          )}
        </div>
        
        <div>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#212529",
            margin: 0,
            marginBottom: "2px"
          }}>
            {selectedConversation.fullname}
          </h3>
          <p style={{
            fontSize: "13px",
            color: isOnline ? "#4ade80" : "#6c757d",
            margin: 0
          }}>
            {isOnline ? "Online" : "Last seen recently"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#f8f9fa",
          color: "#6c757d",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#e9ecef";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#f8f9fa";
        }}>
          <FiPhone size={16} />
        </button>
        
        <button style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#f8f9fa",
          color: "#6c757d",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#e9ecef";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#f8f9fa";
        }}>
          <FiVideo size={16} />
        </button>
        
        <button style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#f8f9fa",
          color: "#6c757d",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#e9ecef";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#f8f9fa";
        }}>
          <FiMoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}

export default Chatuser;