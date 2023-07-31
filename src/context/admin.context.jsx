import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const value = { isAdmin, setIsAdmin };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
