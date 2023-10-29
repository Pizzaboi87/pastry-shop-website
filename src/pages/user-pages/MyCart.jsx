import { CartContext, UserContext } from "../../context";
import { useContext } from "react";
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
  const { text, userLanguage, currency } = useContext(UserContext);
  const { cart } = useContext(CartContext);

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
            <Theme_Button
              $bgcolor="logo"
              $textcolor="textlight"
              $bordercolor="transparent"
              $hoverbgcolor="dark"
              $hovertextcolor="textlight"
              className={myCartStyle.button}
            >
              {text.cart.pay}{" "}
              {currencyCorr(totalSum(cart))
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              {currency.symbol}
            </Theme_Button>
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
