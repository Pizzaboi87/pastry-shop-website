import { CartContext, UserContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderCard, TransitionParent, UserPanel } from "../../components";
import { emptyCart } from "../../assets";
import {
  Theme_Button,
  Theme_Div,
  Theme_H1,
  myCartStyle,
  userPageStyle,
} from "../../styles";

const MyCart = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { text, userLanguage, currency } = useContext(UserContext);
  const [finalSum, setFinalSum] = useState(0);
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
  });

  const totalSum = (cart) => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.product.price * item.quantity;
    });
    return sum;
  };

  const currencyCorr = (price) => {
    if (currency.name === "HUF") {
      return Math.ceil((price * currency.value) / 100) * 100;
    } else {
      return (price * currency.value).toFixed(1);
    }
  };

  useEffect(() => {
    setFinalSum(currencyCorr(totalSum(cart)));
  }, [cart, currency]);

  useEffect(() => {
    setOrderDetails({
      ...orderDetails,
      amount: finalSum,
      currency: currency,
      products: cart,
    });
  }, [finalSum, currency, cart]);

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.myCartTitle}
      </Theme_H1>

      <UserPanel>
        <Theme_Div
          $bgcolor="transparent"
          $bordercolor="transparent"
          className={myCartStyle.container}
        >
          {cart.map((item) => (
            <OrderCard
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              lang={userLanguage}
            />
          ))}
          {cart.length ? (
            <div className={myCartStyle.buttonContainer}>
              <span className={myCartStyle.buttonSpan}>
                <Theme_Button
                  $bgcolor="logo"
                  $textcolor="textlight"
                  $bordercolor="transparent"
                  $hoverbgcolor="dark"
                  $hovertextcolor="textlight"
                  onClick={() => navigate("/shop")}
                  className={myCartStyle.button}
                >
                  {text.cart.shop}
                </Theme_Button>
                <Theme_Button
                  $bgcolor="logo"
                  $textcolor="textlight"
                  $bordercolor="transparent"
                  $hoverbgcolor="dark"
                  $hovertextcolor="textlight"
                  onClick={() => navigate("/checkout", { state: orderDetails })}
                  className={myCartStyle.button}
                >
                  {text.cart.pay}{" "}
                  {finalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  {currency.symbol}
                </Theme_Button>
              </span>
            </div>
          ) : (
            <div className={myCartStyle.emptyWrapper}>
              <img
                src={emptyCart}
                alt="cart"
                className={myCartStyle.emptyImage}
              />
              <h1 className={myCartStyle.emptyText}>{text.cart.empty}</h1>
            </div>
          )}
        </Theme_Div>
      </UserPanel>
    </TransitionParent>
  );
};

export default MyCart;
