"use client";
import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: any;
  token: string | null;
  updateUser: (data: any, token: string) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [initialState, setInitialState] = useState({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
  });

  const updateUser = (data: any, token: string) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", token);
    setInitialState({ user: data, token });
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setInitialState({ user: null, token: "" });
  };

  return (
    <AuthContext.Provider value={{ ...initialState, updateUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
