import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext({
  user: null,
  setUser: () => null,
  clientSecret: null,
  sertClientSecret: () => null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [clientSecret, sertClientSecret] = useState(null);

  return (
    <AuthContext.Provider
      value={{ user, setUser, clientSecret, sertClientSecret }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
