import { createContext, useEffect, useState } from "react";
import { hu_text, en_text, es_text, fr_text } from "../constants";
import { Loading } from "../components";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const [userLanguage, setUserLanguage] = useState("eng");
  const [text, setText] = useState(null);
  const value = { userLanguage, setUserLanguage, text };

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

  if (!text) return <Loading />;

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
