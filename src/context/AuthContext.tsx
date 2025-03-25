"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../lib/firebase/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { saveUserToFirestore } from "@/lib/firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          localStorage.setItem("authUser", JSON.stringify(firebaseUser));

          // Зберігаємо користувача у Firestore
          try {
            await saveUserToFirestore(firebaseUser);
          } catch (error) {
            console.error(
              "Помилка при збереженні користувача у Firestore:",
              error
            );
          }
        } else {
          setUser(null);
          localStorage.removeItem("authUser");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Помилка в onAuthStateChanged:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
