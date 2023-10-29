import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  /*const testObj = {
    product: {
      category: "gifts",
      comment: "15cm",
      id: "gift_001",
      image:
        "https://firebasestorage.googleapis.com/v0/b/le-ciel-sucre.appspot.com/o/products%2Fgifts%2Fbadge.webp?alt=media&token=e64312b0-c5e0-48b0-80e6-296f76352222",
      name: {
        eng: "Badge",
        esp: "Insignia",
        fra: "Badge",
        hun: "Kitűző",
      },
      price: 2,
      rate: 5,
    },
    quantity: 2,
  };*/

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
