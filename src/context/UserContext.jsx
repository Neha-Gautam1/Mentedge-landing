// src/context/UserContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const { data } = await axios.get("http://localhost:5000/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data.user);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      }
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
