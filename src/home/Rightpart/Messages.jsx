import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // listening for incoming messages

  const lastMsgRef = useRef();
  const messagesContainerRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fafafa"
      }}>
        <Loading />
      </div>
    );
  }

  return (
    <div
      ref={messagesContainerRef}
      style={{
        height: "100%",
        overflowY: "auto",
        paddingRight: "8px",
        backgroundColor: "#fafafa"
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background-color: #d1d1d6;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background-color: #c7c7cc;
        }
      `}</style>

      {messages.length > 0 ? (
        <>
          {/* Date separator */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            margin: "30px 0 25px 0"
          }}>
            <span style={{
              fontSize: "13px",
              color: "#86868b",
              backgroundColor: "#ffffff",
              padding: "8px 16px",
              borderRadius: "16px",
              border: "1px solid #f0f0f5",
              fontWeight: "500",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
            }}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>

          {messages.map((message, index) => (
            <div 
              key={message._id}
              ref={index === messages.length - 1 ? lastMsgRef : null}
            >
              <Message message={message} />
            </div>
          ))}
        </>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
          padding: "40px"
        }}>
          <div style={{
            width: "100px",
            height: "100px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            fontSize: "40px",
            color: "white",
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)"
          }}>
            👋
          </div>
          <h3 style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#1d1d1f",
            margin: "0 0 12px 0",
            letterSpacing: "-0.5px"
          }}>
            Say Hi to start the conversation
          </h3>
          <p style={{
            fontSize: "16px",
            color: "#86868b",
            margin: 0,
            lineHeight: "1.5",
            fontWeight: "400"
          }}>
            Send a message to begin chatting
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
