import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        color: "#86868b",
        fontSize: "16px",
        fontWeight: "500"
      }}>
        Loading contacts...
      </div>
    );
  }

  return (
    <div style={{
      height: "100%",
      overflowY: "auto",
      paddingBottom: "20px"
    }}>
      {/* Custom scrollbar styling */}
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
             
      {allUsers.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#86868b"
        }}>
          <div style={{
            fontSize: "48px",
            marginBottom: "16px",
            opacity: "0.5"
          }}>
            💬
          </div>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1d1d1f",
            marginBottom: "8px"
          }}>
            No contacts found
          </h3>
          <p style={{
            fontSize: "14px",
            color: "#86868b",
            margin: 0
          }}>
            Start a conversation by searching for users
          </p>
        </div>
      ) : (
        allUsers.map((user, index) => (
          <User key={user._id || index} user={user} />
        ))
      )}
    </div>
  );
}

export default Users;