import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserData,
  getUserImage,
} from "../utils/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const value = { currentUser, setCurrentUser, userData, userImage };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const fetchUserData = async () => {
      const userDatafromDB = await getUserData(currentUser.uid);
      const userImagefromDB = await getUserImage(currentUser.uid);

      setUserData(userDatafromDB);
      setUserImage(userImagefromDB);
    };

    fetchUserData(currentUser.uid);
  }, [currentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
