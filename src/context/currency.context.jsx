import { createContext, useEffect, useState } from "react";
import { Loading } from "../components";

export const CurrencyContext = createContext();

export const CurrencyContextProvider = ({ children }) => {
  const [userCurrency, setUserCurrency] = useState("EUR");
  const [currency, setCurrency] = useState({
    symbol: "",
    name: "",
    value: 1,
  });
  const value = { currency, userCurrency, setUserCurrency };

  useEffect(() => {
    switch (userCurrency) {
      case "USD":
        setCurrency((prevCurrency) => ({
          ...prevCurrency,
          symbol: "$",
          name: "US Dollar",
          value: 1.1,
        }));
        break;
      case "GBP":
        setCurrency((prevCurrency) => ({
          ...prevCurrency,
          symbol: "£",
          name: "British Pound",
          value: 0.9,
        }));
        break;
      case "HUF":
        setCurrency((prevCurrency) => ({
          ...prevCurrency,
          symbol: "Ft",
          name: "Hungarian Forint",
          value: 360,
        }));
        break;
      default:
        setCurrency((prevCurrency) => ({
          ...prevCurrency,
          symbol: "€",
          name: "Euro",
          value: 1,
        }));
        break;
    }
  }, [userCurrency]);

  if (!currency) return <Loading />;

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
