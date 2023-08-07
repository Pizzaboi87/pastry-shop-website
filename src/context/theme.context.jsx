import { createContext, useEffect, useState } from "react";
import { colors } from "../styles/colors";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [userTheme, setUserTheme] = useState("blue");
  const value = { userTheme, setUserTheme };

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
  }, [userTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
