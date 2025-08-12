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
        height: "100%"
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
        paddingRight: "4px"
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
          background-color: rgba(0,0,0,0.2);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0,0,0,0.3);
        }
      `}</style>

      {messages.length > 0 ? (
        <>
          {/* Date separator - you can customize this based on your needs */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0"
          }}>
            <span style={{
              fontSize: "12px",
              color: "#6c757d",
              backgroundColor: "#f8f9fa",
              padding: "4px 12px",
              borderRadius: "12px",
              border: "1px solid #e9ecef"
            }}>
              Today
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
          color: "#6c757d"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#f8f9fa",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            fontSize: "32px"
          }}>
            👋
          </div>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "#212529",
            margin: "0 0 8px 0"
          }}>
            Say Hi to start the conversation
          </h3>
          <p style={{
            fontSize: "14px",
            color: "#6c757d",
            margin: 0
          }}>
            Send a message to begin chatting
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;




