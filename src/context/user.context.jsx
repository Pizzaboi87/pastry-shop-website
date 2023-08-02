import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserData,
  getUserImage,
  auth,
  getStoredImage,
} from "../utils/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const value = {
    currentUser,
    setCurrentUser,
    userData,
    setUserData,
    userImage,
  };

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
    if (!currentUser || !currentUser.uid) return;
    const fetchUserData = async () => {
      const userDatafromDB = await getUserData(currentUser.uid);
      setUserData(userDatafromDB);

      if (userDatafromDB.photoExtension) {
        const userImagefromDB = await getUserImage(currentUser.uid);
        setUserImage(userImagefromDB);
      } else {
        const defaultImage = await getStoredImage("blog/profile.jpg");
        setUserImage(defaultImage);
      }
    };

    fetchUserData(currentUser.uid);
  }, [currentUser, auth]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
