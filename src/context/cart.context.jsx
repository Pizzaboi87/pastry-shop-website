import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./user.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const testObj = {
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
  };

  const { currency } = useContext(UserContext);
  const [finalSum, setFinalSum] = useState(0);
  const [cart, setCart] = useState([testObj]);
  const [orderDetails, setOrderDetails] = useState({
    fullName: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    zipCode: "",
    amount: finalSum,
    currency: currency,
    products: cart,
    paymentMethod: "credit",
  });

  const totalSum = (cart) => {
    let sum = 0;

    cart.forEach((item) => {
      if (currency.name == "HUF") {
        sum +=
          Math.ceil((item.product.price * currency.value) / 100) *
          100 *
          item.quantity;
      } else {
        sum += (
          (item.product.price.toFixed(1) * currency.value).toFixed(1) *
          item.quantity
        ).toFixed(1);
      }
    });
    return sum;
  };

  useEffect(() => {
    setFinalSum(totalSum(cart));
  }, [cart, currency]);

  useEffect(() => {
    setOrderDetails({
      ...orderDetails,
      amount: finalSum,
      currency: currency,
      products: cart,
    });
  }, [finalSum, currency, cart]);

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

  const value = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    orderDetails,
    setOrderDetails,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
