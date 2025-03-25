import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, loading, setUser, setLoading } = context;

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }
  }, [setUser, setLoading]);

  return { user, loading };
};
