import React, { useEffect, useState } from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { FiMessageSquare, FiUsers, FiFolder, FiArchive, FiSettings } from "react-icons/fi";

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
    { id: "settings", icon: FiSettings, label: "Settings" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "70px",
          backgroundColor: "#0F0F0F", // black sidebar
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        {/* Profile Initial */}
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#8b5cf6",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "40px",
          }}
        >
          {userData?.name?.charAt(0) || "U"}
        </div>

        {/* Navigation Icons - center aligned */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundColor: isActive ? "#8b5cf6" : "transparent",
                  color: isActive ? "white" : "#9ca3af",
                  transition: "all 0.2s ease",
                }}
              >
                <IconComponent size={20} />
              </div>
            );
          })}
        </div>

        {/* Logout at bottom */}
        <div style={{ marginTop: "auto" }}>
          <Logout />
        </div>
      </div>

      {/* Chat List */}
      <div style={{ flex: 1, backgroundColor: "#f9fafb", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", margin: "0 0 6px 0" }}>
            {activeTab === "chats" ? "Design chat" : navItems.find((item) => item.id === activeTab)?.label}
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>23 members, 10 online</p>
        </div>

        {/* Search */}
        <div style={{ padding: "10px 20px", borderBottom: "1px solid #e5e7eb" }}>
          <Search />
        </div>

        {/* Users */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Users />
        </div>
      </div>
    </div>
  );
}

export default Left;
