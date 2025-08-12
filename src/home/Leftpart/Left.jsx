import React, { useEffect, useState } from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { FiMessageSquare, FiUsers, FiFolder, FiArchive, FiUser, FiEdit } from "react-icons/fi";

function Left() {
  const [authUser] = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("chats");


  useEffect(() => {
    if (authUser?._id) {
      axios
        .get(`http://localhost:5000/api/users/${authUser._id}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error("Error fetching user data", err));
    }
  }, [authUser]);

  const navItems = [
    { id: "chats", icon: FiMessageSquare, label: "All chats" },
    { id: "work", icon: FiUsers, label: "Work" },
    { id: "friends", icon: FiFolder, label: "Friends" },
    { id: "news", icon: FiArchive, label: "News" },
    { id: "archive", icon: FiArchive, label: "Archive chats" },
    { id: "profile", icon: FiUser, label: "Profile" },
    { id: "edit", icon: FiEdit, label: "Edit" },
  ];

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      backgroundColor: "#202022" 
    }}>
      {/* Left Navigation Sidebar */}
      <div
        style={{
          width: "100px",
          backgroundColor: "#202022",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 0",
          gap: "4px",
          flexShrink: 0
        }}
      >
        {/* Profile Avatar */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "600",
            color: "white",
            marginBottom: "36px",
            cursor: "pointer"
          }}
        >
          <span style={{ transform: "rotate(-15deg)" }}>M</span>
        </div>

        {/* Navigation Items */}
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                marginBottom: "12px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.children[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.children[0].style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.children[0].style.backgroundColor = "transparent";
                  e.currentTarget.children[0].style.color = "#8e8e93";
                }
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isActive ? "#f9fafc" : "transparent",
                  color: isActive ? "#202022" : "#8e8e93",
                  transition: "all 0.2s ease"
                }}
              >
                <IconComponent size={18} />
              </div>
              <span
                style={{
                  fontSize: "10px",
                  color: isActive ? "#f9fafc" : "#8e8e93",
                  marginTop: "4px",
                  textAlign: "center",
                  lineHeight: "1.2"
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}

        {/* Bottom Icons */}
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
          <Logout />
        </div>
      </div>

      {/* Main Chat Area - Contact List Area */}
      <div style={{ 
        width: "480px",
        minWidth: "460px",
        maxWidth: "500px",
        backgroundColor: "#f9fafc", 
        display: "flex", 
        flexDirection: "column",
        borderTopLeftRadius: "12px",
        flexShrink: 0
      }}>
        {/* Search Bar */}
        <div style={{ 
          padding: "20px 20px 12px 20px",
          backgroundColor: "#f9fafc"
        }}>
          <div style={{ transform: "scale(0.9)" }}>
            <Search />
          </div>
        </div>

        {/* Users List */}
        <div style={{ 
          flex: 1, 
          overflowY: "auto",
          backgroundColor: "#f9fafc",
          padding: "0 16px"
        }}>
          <Users />
        </div>
      </div>
    </div>
  );
}

export default Left;