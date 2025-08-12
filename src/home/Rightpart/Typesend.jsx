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
      padding: "16px 20px",
      borderTop: "1px solid #e9ecef",
      backgroundColor: "#ffffff"
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
          }}
        >
          <FiPaperclip size={16} />
        </button>

        {/* Message input */}
        <div style={{
          flex: 1,
          position: "relative",
          backgroundColor: "#f8f9fa",
          borderRadius: "20px",
          border: "1px solid #e9ecef"
        }}>
          <input
            type="text"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 45px 10px 16px",
              borderRadius: "20px",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "14px",
              color: "#212529"
            }}
            onFocus={(e) => {
              e.target.parentElement.style.borderColor = "#007acc";
            }}
            onBlur={(e) => {
              e.target.parentElement.style.borderColor = "#e9ecef";
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
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "transparent",
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
              e.target.style.backgroundColor = "transparent";
            }}
          >
            <FiSmile size={16} />
          </button>
        </div>

        {/* Send button */}
        <button 
          type="submit" 
          disabled={!message.trim()}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: message.trim() ? "#007acc" : "#e9ecef",
            color: message.trim() ? "white" : "#6c757d",
            cursor: message.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
        >
          <IoSend size={16} />
        </button>
      </form>
    </div>
  );
}

export default Typesend;