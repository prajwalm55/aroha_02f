import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: "relative", width: "100%" }}>
      <FaSearch
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#86868b",
          fontSize: "16px",
        }}
      />
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "240px",
          padding: "12px 16px 12px 42px",
          backgroundColor: "rgb(219, 221, 259)" ,
          border: "none",
          borderRadius: "12px",
          color: "black",
          fontSize: "15px",
          outline: "none",
          fontFamily: "inherit",
          transition: "all 0.2s ease",
        }}
        onFocus={(e) => {
          e.target.style.backgroundColor = "#6366e3";
        }}
        onBlur={(e) => {
          e.target.style.backgroundColor = "#7678ed";
        }}
      />
      <style jsx>{`
        input::placeholder {
          color: rgb(221, 204, 255);
        }
      `}</style>
    </form>
  );
}

export default Search;