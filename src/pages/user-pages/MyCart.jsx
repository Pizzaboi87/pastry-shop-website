import { CartContext, UserContext } from "../../context";
import { useContext } from "react";
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
import { Icon } from "@iconify/react";

const MyCart = () => {
  const navigate = useNavigate();
  const { text, userLanguage } = useContext(UserContext);
  const { cart } = useContext(CartContext);

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
                  <Icon icon="line-md:arrow-left-circle" />
                  {text.cart.shop}
                </Theme_Button>
                <Theme_Button
                  $bgcolor="logo"
                  $textcolor="textlight"
                  $bordercolor="transparent"
                  $hoverbgcolor="dark"
                  $hovertextcolor="textlight"
                  onClick={() => navigate("/checkout")}
                  className={myCartStyle.button}
                >
                  {text.cart.next}
                  <Icon icon="line-md:arrow-right-circle" />
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
