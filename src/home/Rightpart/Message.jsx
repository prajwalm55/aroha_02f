// claude u

import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{
      display: "flex",
      justifyContent: itsMe ? "flex-end" : "flex-start",
      marginBottom: "16px",
      alignItems: "flex-end"
    }}>
      {/* Avatar for received messages */}
      {!itsMe && (
        <img
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          alt="avatar"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            marginRight: "8px",
            objectFit: "cover"
          }}
        />
      )}
      
      <div style={{
        maxWidth: "70%",
        display: "flex",
        flexDirection: "column",
        alignItems: itsMe ? "flex-end" : "flex-start"
      }}>
        <div style={{
          backgroundColor: itsMe ? "#007acc" : "#ffffff",
          color: itsMe ? "#ffffff" : "#212529",
          padding: "10px 14px",
          borderRadius: itsMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          fontSize: "14px",
          lineHeight: "1.4",
          wordWrap: "break-word",
          border: itsMe ? "none" : "1px solid #e9ecef"
        }}>
          {message.message}
        </div>
        
        <div style={{
          fontSize: "11px",
          color: "#6c757d",
          marginTop: "4px",
          paddingLeft: itsMe ? "0" : "14px",
          paddingRight: itsMe ? "14px" : "0"
        }}>
          {formattedTime}
        </div>
      </div>

      {/* Avatar for sent messages */}
      {itsMe && (
        <img
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          alt="avatar"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            marginLeft: "8px",
            objectFit: "cover"
          }}
        />
      )}
    </div>
  );
}

export default Message;