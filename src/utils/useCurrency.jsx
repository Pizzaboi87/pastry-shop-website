import { useEffect, useState } from "react";

export const useCurrency = (currency, value, quantity) => {
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
