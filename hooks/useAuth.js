import React, { createContext, useContext } from "react";

const AuthContext = createContext();

const getAuthToken = async () => {
  const response = await fetch("/api/auth");
  const authoken = await response.json();
  return authoken;
};

export function AuthProvider({ children }) {
  const authToken = getAuthToken();

  return (
    <AuthContext.Provider value={authToken}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export default useAuth;
