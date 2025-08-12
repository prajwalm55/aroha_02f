import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FiPaperclip, FiSmile } from "react-icons/fi";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message);
    setMessage("");
  };

  return (
    <div style={{
      padding: "20px 25px",
      borderTop: "1px solid #f0f0f5",
      backgroundColor: "#ffffff",
      boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.05)"
    }}>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        {/* Attachment button */}
        <button
          type="button"
          style={{
            width: "44px",
            height: "44px",
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
            e.target.style.backgroundColor = "#007aff";
            e.target.style.color = "#ffffff";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#f2f2f7";
            e.target.style.color = "#86868b";
            e.target.style.transform = "scale(1)";
          }}
        >
          <FiPaperclip size={18} />
        </button>

        {/* Message input */}
        <div style={{
          flex: 1,
          position: "relative",
          backgroundColor: "#f2f2f7",
          borderRadius: "24px",
          border: "2px solid transparent",
          transition: "all 0.2s ease"
        }}>
          <input
            type="text"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 50px 12px 20px",
              borderRadius: "24px",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "15px",
              color: "#1d1d1f",
              fontWeight: "400"
            }}
            onFocus={(e) => {
              e.target.parentElement.style.borderColor = "#007aff";
              e.target.parentElement.style.backgroundColor = "#ffffff";
              e.target.parentElement.style.boxShadow = "0 0 0 3px rgba(0, 122, 255, 0.1)";
            }}
            onBlur={(e) => {
              e.target.parentElement.style.borderColor = "transparent";
              e.target.parentElement.style.backgroundColor = "#f2f2f7";
              e.target.parentElement.style.boxShadow = "none";
            }}
          />
          
          {/* Emoji button */}
          <button
            type="button"
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "transparent",
              color: "#86868b",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e5e5e7";
              e.target.style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <FiSmile size={18} />
          </button>
        </div>

        {/* Send button */}
        <button 
          type="submit" 
          disabled={!message.trim()}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: message.trim() ? "#007aff" : "#e5e5e7",
            color: message.trim() ? "white" : "#86868b",
            cursor: message.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: message.trim() ? "0 2px 12px rgba(0, 122, 255, 0.3)" : "none",
            transform: message.trim() ? "scale(1)" : "scale(0.95)"
          }}
          onMouseEnter={(e) => {
            if (message.trim()) {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 20px rgba(0, 122, 255, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            if (message.trim()) {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 2px 12px rgba(0, 122, 255, 0.3)";
            }
          }}
        >
          <IoSend size={18} />
        </button>
      </form>
    </div>
  );
}

export default Typesend;