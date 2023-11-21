import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./user.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { currency } = useContext(UserContext);
  const [finalSum, setFinalSum] = useState(0);
  const [cart, setCart] = useState([]);
  const defaultOrderDetails = {
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
    orderTime: "",
  };

  const [orderDetails, setOrderDetails] = useState({
    ...defaultOrderDetails,
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
        sum += Number(
          (
            (item.product.price.toFixed(1) * currency.value).toFixed(1) *
            item.quantity
          ).toFixed(1)
        );
      }
    });
    return sum;
  };

  useEffect(() => {
    if (cart.length === 0) setFinalSum(0);
    else setFinalSum(totalSum(cart));
  }, [cart, currency]);

  useEffect(() => {
    if (cart.length === 0) setOrderDetails({ ...defaultOrderDetails });
    else
      setOrderDetails((prevOrderDetails) => ({
        ...prevOrderDetails,
        amount: finalSum,
        currency: currency,
        products: cart,
      }));
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

  const clearCart = () => {
    setFinalSum(0);
    setCart([]);
    setOrderDetails(defaultOrderDetails);
  };

  const value = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    orderDetails,
    setOrderDetails,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
