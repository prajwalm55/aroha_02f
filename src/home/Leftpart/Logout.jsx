import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleLogout}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#8e8e93",
        transition: "all 0.2s ease",
        opacity: loading ? 0.6 : 1,
        pointerEvents: loading ? "none" : "auto"
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#3e3e42";
        e.target.style.color = "#ff6b6b";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "#8e8e93";
      }}
    >
      <BiLogOutCircle size={22} />
    </div>
  );
}

export default Logout;