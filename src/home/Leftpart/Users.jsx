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
        color: "#8e8e93"
      }}>
        Loading contacts...
      </div>
    );
  }

  return (
    <div style={{
      height: "100%",
      overflowY: "auto",
      paddingRight: "8px"
    }}>
      {/* Hide scrollbar but keep functionality */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background-color: #3e3e42;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background-color: #4e4e52;
        }
      `}</style>
      
      {allUsers.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          color: "#8e8e93"
        }}>
          <p>No contacts found</p>
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