import { createContext, useEffect, useState } from "react";
import { colors } from "../styles/colors";
import { hu_text, en_text, es_text, fr_text } from "../constants";
import { Loading } from "../components";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserData,
  getUserImage,
  getStoredImage,
} from "../utils/firebase";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [isReg, setIsReg] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [userLanguage, setUserLanguage] = useState(null);
  const [text, setText] = useState(null);
  const [userTheme, setUserTheme] = useState(null);
  const [userNewsLetter, setUserNewsLetter] = useState(false);
  const [userCurrency, setUserCurrency] = useState(null);
  const [currency, setCurrency] = useState({
    symbol: "",
    name: "",
    value: 1,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
        const userDatafromDB = await getUserData(user.uid);
        setUserData(userDatafromDB);

        if (userDatafromDB.photoExtension?.length > 0) {
          const userImagefromDB = await getUserImage(user.uid);
          setUserImage(userImagefromDB);
        } else if (user?.photoURL) {
          const googleImage = user.photoURL;
          setUserImage(googleImage);
        } else {
          const defaultImage = await getStoredImage("blog/profile.jpg");
          setUserImage(defaultImage);
        }
      } else {
        setUserData(null);
      }
      setCurrentUser(user);
      setIsDataLoaded(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const defaultUserCurrency = userData ? userData.selectedCurr : "eur";
    setUserCurrency(defaultUserCurrency);

    const defaultUserLanguage = userData ? userData.selectedLang : "eng";
    setUserLanguage(defaultUserLanguage);

    const defaultUserTheme = userData ? userData.selectedTheme : "pink";
    setUserTheme(defaultUserTheme);

    const defaultUserNewsLetter = userData ? userData.newsletter : false;
    setUserNewsLetter(defaultUserNewsLetter);
  }, [userData, currentUser]);

  useEffect(() => {
    switch (userTheme) {
      case "blue":
        document.body.style.backgroundColor = colors.blue.background;
        break;
      case "green":
        document.body.style.backgroundColor = colors.green.background;
        break;
      case "brown":
        document.body.style.backgroundColor = colors.brown.background;
        break;
      default:
        document.body.style.backgroundColor = colors.pink.background;
        break;
    }
  }, [userTheme]);

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
  }, [userLanguage]);

  useEffect(() => {
    switch (userCurrency) {
      case "usd":
        setCurrency({
          symbol: "$",
          name: "USD",
          value: 1.1,
        });
        break;
      case "gbp":
        setCurrency({
          symbol: "£",
          name: "GBP",
          value: 0.86,
        });
        break;
      case "huf":
        setCurrency({
          symbol: "Ft",
          name: "HUF",
          value: 380,
        });
        break;
      default:
        setCurrency({
          symbol: "€",
          name: "EUR",
          value: 1,
        });
        break;
    }
  }, [userCurrency]);

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
    userNewsLetter,
    setUserNewsLetter,
    isReg,
    setIsReg,
    isAdmin,
    setIsAdmin,
  };

  if (!isDataLoaded)
    return (
      <div className="w-full h-[100vh]">
        <Loading />
      </div>
    );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
