import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";

export const useCurrency = (value, quantity) => {
  const { currency } = useContext(UserContext);
  const [pricePerItem, setPricePerItem] = useState(0);
  const [fullPrice, setFullPrice] = useState(0);

  const stringPrice = (price, fix) => {
    return price
      .toFixed(fix)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  useEffect(() => {
    if (currency.name === "HUF") {
      const basePrice = Math.ceil((value * currency.value) / 100) * 100;
      setPricePerItem(stringPrice(basePrice, 0));
      setFullPrice(stringPrice(basePrice * quantity, 0));
    } else {
      const basePrice = value * currency.value;
      setPricePerItem(stringPrice(basePrice, 1));
      setFullPrice(stringPrice(basePrice.toFixed(1) * quantity, 1));
    }
  }, [currency, value, quantity]);

  return { pricePerItem, fullPrice };
};
