import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (cart.find((item) => item.product.id === product.id)) {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart((prevCart) => [...prevCart, { product: product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    if (
      cart.find((item) => item.product.id === product.id && item.quantity > 1)
    ) {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart((prevCart) => [
        ...prevCart.filter((item) => item.product.id !== product.id),
      ]);
    }
  };

  const value = { cart, setCart, addToCart, removeFromCart };

  console.log("Cart: ", cart);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
