import { createContext, useEffect, useState } from "react";
import {
  auth,
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase";
import { Loading } from "../components";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  if (!auth && !currentUser) return <Loading />;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
