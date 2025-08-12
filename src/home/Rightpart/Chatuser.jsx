import React, { useState, useRef, useEffect } from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { FiPhone, FiVideo, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

function Chatuser() {
  const { selectedConversation, setMessages } = useConversation();
  const { onlineUsers, socket } = useSocketContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const dropdownRef = useRef(null);

  const isOnline = onlineUsers.includes(selectedConversation._id);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Listen for chat cleared events via socket
  useEffect(() => {
    if (!socket) return;

    const handleChatCleared = () => {
      setMessages([]);
      toast.success("Chat cleared successfully");
    };

    socket.on("chatCleared", handleChatCleared);

    return () => {
      socket.off("chatCleared", handleChatCleared);
    };
  }, [socket, setMessages]);

  const handleClearChat = async () => {
    if (!selectedConversation?._id) {
      toast.error("No conversation selected");
      return;
    }

    // Add confirmation dialog
    const confirmClear = window.confirm(
      `Are you sure you want to clear all messages with ${selectedConversation.fullname}? This action cannot be undone.`
    );

    if (!confirmClear) return;

    setIsClearing(true);
    setShowDropdown(false);

    try {
      const res = await fetch(`/api/message/clear/${selectedConversation._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for authentication
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to clear chat");
      }

      // Clear messages from the UI immediately
      setMessages([]);
      toast.success("Chat cleared successfully");

    } catch (error) {
      console.error("Error clearing chat:", error);
      toast.error(error.message || "Failed to clear chat");
    } finally {
      setIsClearing(false);
    }
  };

  const avatarColors = [
    'linear-gradient(135deg, #202022 0%, #202022 100%)',
    'linear-gradient(135deg, #7678ed 0%, #7678ed 100%)',
    'linear-gradient(135deg, #ff7a55 0%, #ff7a55 100%)',
    'linear-gradient(135deg, #f9fafc 0%, #f9fafc 100%)',
  ];

  const getAvatarColor = (name) => {
    const index = name ? name.charCodeAt(0) % avatarColors.length : 0;
    return avatarColors[index];
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 25px",
      borderBottom: "1px solid #e5e5e7",
      backgroundColor: "#ffffff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    }}>
      {/* User Info */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative", marginRight: "15px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: getAvatarColor(selectedConversation.fullname),
              color: "white",
              fontWeight: "600",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "uppercase",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            {selectedConversation.fullname?.charAt(0) || "U"}
          </div>
          {isOnline && (
            <div style={{
              position: "absolute",
              bottom: "2px",
              right: "2px",
              width: "14px",
              height: "14px",
              backgroundColor: "#34c759",
              borderRadius: "50%",
              border: "3px solid white",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)"
            }} />
          )}
        </div>
        
        <div>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1d1d1f",
            margin: 0,
            marginBottom: "3px",
            letterSpacing: "-0.2px"
          }}>
            {selectedConversation.fullname}
          </h3>
          <p style={{
            fontSize: "14px",
            color: isOnline ? "#34c759" : "#86868b",
            margin: 0,
            fontWeight: "500"
          }}>
            {isOnline ? "Online" : "Last seen recently"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#f2f2f7",
          color: "#86868b",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#7678ed";
          e.target.style.color = "#ffffff";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#f2f2f7";
          e.target.style.color = "#86868b";
          e.target.style.transform = "scale(1)";
        }}>
          <FiPhone size={18} />
        </button>
        
        <button style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#f2f2f7",
          color: "#86868b",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#7678ed";
          e.target.style.color = "#ffffff";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#f2f2f7";
          e.target.style.color = "#86868b";
          e.target.style.transform = "scale(1)";
        }}>
          <FiVideo size={18} />
        </button>
        
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: showDropdown ? "#7678ed" : "#f2f2f7",
              color: showDropdown ? "#ffffff" : "#86868b",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              transform: showDropdown ? "scale(1.05)" : "scale(1)"
            }}
            onMouseEnter={(e) => {
              if (!showDropdown) {
                e.target.style.backgroundColor = "#7678ed";
                e.target.style.color = "#ffffff";
                e.target.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (!showDropdown) {
                e.target.style.backgroundColor = "#f2f2f7";
                e.target.style.color = "#86868b";
                e.target.style.transform = "scale(1)";
              }
            }}
          >
            <FiMoreHorizontal size={18} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: "0",
              marginTop: "8px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              border: "1px solid #f0f0f5",
              minWidth: "160px",
              zIndex: 1000,
              overflow: "hidden"
            }}>
              <div
                onClick={handleClearChat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  color: isClearing ? "#bbb" : "#ff7a55",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: isClearing ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  gap: "10px",
                  opacity: isClearing ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isClearing) {
                    e.target.style.backgroundColor = "#fff5f3";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isClearing) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                <FiTrash2 size={16} />
                {isClearing ? "Clearing..." : "Clear Chat"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatuser;