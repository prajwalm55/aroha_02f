import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import useConversation from "../zustand/useConversation";

function useGetGroups() {
  const [loading, setLoading] = useState(false);
  const { groups, setGroups } = useConversation();

  useEffect(() => {
    const getGroups = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/group", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroups(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetGroups: " + error);
        setLoading(false);
      }
    };
    getGroups();
  }, [setGroups]);

  return [groups, loading];
}

export default useGetGroups;