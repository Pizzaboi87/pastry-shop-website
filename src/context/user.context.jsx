import { createContext, useEffect, useState } from "react";
import { colors } from "../styles/colors";
import { hu_text, en_text, es_text, fr_text } from "../constants";
import { Loading } from "../components";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserData,
  getUserImage,
  auth,
  getStoredImage,
} from "../utils/firebase";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [userLanguage, setUserLanguage] = useState(null);
  const [text, setText] = useState(null);
  const [userTheme, setUserTheme] = useState(null);
  const [userCurrency, setUserCurrency] = useState(null);
  const [currency, setCurrency] = useState({
    symbol: "",
    name: "",
    value: 1,
  });

  //----------------------------------FETCHING USER DATA----------------------------------//
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
    if (!currentUser || !currentUser.uid) {
      setUserData(null);
      setIsDataLoaded(true);
      return;
    }

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

      setIsDataLoaded(true);
    };

    fetchUserData(currentUser.uid);
  }, [currentUser, auth]);

  //----------------------------------SETTING USER DATA----------------------------------//
  useEffect(() => {
    const defaultUserCurrency = userData ? userData.selectedCurr : "eur";
    setUserCurrency(defaultUserCurrency);

    const defaultUserLanguage = userData ? userData.selectedLang : "eng";
    setUserLanguage(defaultUserLanguage);

    const defaultUserTheme = userData ? userData.selectedTheme : "pink";
    setUserTheme(defaultUserTheme);
  }, [userData, currentUser, auth]);

  useEffect(() => {
    switch (userCurrency) {
      case "usd":
        setCurrency({
          symbol: "$",
          name: "US Dollar",
          value: 1.1,
        });
        break;
      case "gbp":
        setCurrency({
          symbol: "£",
          name: "British Pound",
          value: 0.9,
        });
        break;
      case "huf":
        setCurrency({
          symbol: "Ft",
          name: "Hungarian Forint",
          value: 360,
        });
        break;
      default:
        setCurrency({
          symbol: "€",
          name: "Euro",
          value: 1,
        });
        break;
    }
  }, [userCurrency, currentUser]);

  useEffect(() => {
    switch (userLanguage) {
      case "hun":
        setText(hu_text);
        break;
      case "esp":
        setText(es_text);
        break;
      case "fra":
        setText(fr_text);
        break;
      default:
        setText(en_text);
        break;
    }
  }, [userLanguage, currentUser]);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    switch (userTheme) {
      case "blue":
        body.style.backgroundColor = colors.blue.background;
        break;
      case "green":
        body.style.backgroundColor = colors.green.background;
        break;
      case "brown":
        body.style.backgroundColor = colors.brown.background;
        break;
      default:
        body.style.backgroundColor = colors.pink.background;
        break;
    }
  }, [userTheme, currentUser]);

  const userContextValue = {
    currentUser,
    setCurrentUser,
    userData,
    setUserData,
    userImage,
    setUserImage,
    userCurrency,
    setUserCurrency,
    currency,
    userLanguage,
    setUserLanguage,
    text,
    userTheme,
    setUserTheme,
  };

  if (!isDataLoaded) return <Loading />;

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
