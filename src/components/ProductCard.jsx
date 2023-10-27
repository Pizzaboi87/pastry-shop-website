import { Icon } from "@iconify/react";
import { CartContext, UserContext } from "../context";
import { useContext } from "react";
import { Theme_Button, Theme_Div, shop } from "../styles";

const CartButton = ({ children, func, extraClass, normalButton }) => {
  return (
    <Theme_Button
      $bgcolor="logo"
      $textcolor="textlight"
      $bordercolor="transparent"
      $hoverbgcolor={normalButton ? null : "dark"}
      $hovertextcolor={normalButton ? null : "textlight"}
      className={`${shop.cardButton} ${extraClass}`}
      onClick={func}
    >
      {children}
    </Theme_Button>
  );
};

const ProductCard = ({ product }) => {
  const { text, userLanguage, currency } = useContext(UserContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const currencyCorr = (price) => {
    if (currency.name === "HUF") {
      return Math.ceil((price * currency.value) / 100) * 100;
    } else {
      return (price * currency.value).toFixed(1);
    }
  };

  return (
    <div className={shop.cardContainer}>
      <Theme_Div
        $bgcolor="transparent"
        $bordercolor="logo"
        className={shop.cardImageContainer}
      >
        <div
          className={shop.cardImage}
          style={{ backgroundImage: `url(${product.image})` }}
        />
      </Theme_Div>

      <div className={shop.cardSpace} />

      <Theme_Div
        $bgcolor="secondary"
        $bordercolor="logo"
        className={shop.cardInfoContainer}
      >
        <span className={shop.cardStar}>
          {Array.from({ length: product.rate }, (i) => i).map((_, index) => (
            <Icon key={index} icon="carbon-star-filled" />
          ))}
          {Array.from({ length: 5 - product.rate }, (i) => i).map(
            (_, index) => (
              <Icon key={index} icon="carbon-star" />
            )
          )}
        </span>
        <h1 className={shop.productName}>{product.name[userLanguage]}</h1>
        <h2 className={shop.productComment}>{product.comment}</h2>
        <h3 className={shop.productPrice}>{`${currencyCorr(product.price)} ${
          currency.symbol
        }`}</h3>
      </Theme_Div>

      <div className={shop.cardSpace} />

      {cart.find((item) => item.product.id === product.id) ? (
        <div className={shop.buttonContainer}>
          <CartButton func={() => removeFromCart(product)}>
            <Icon icon="carbon:shopping-cart-minus" className={shop.icon} />
          </CartButton>

          <CartButton normalButton extraClass="cursor-default">
            <p className={shop.quantity}>
              {cart.find((item) => item.product.id === product.id).quantity}
            </p>
          </CartButton>

          <CartButton func={() => addToCart(product)}>
            <Icon icon="carbon:shopping-cart-plus" className={shop.icon} />
          </CartButton>
        </div>
      ) : (
        <CartButton func={() => addToCart(product)}>
          <Icon icon="carbon:shopping-cart" className={shop.icon} />
          <p className={shop.cardButtonText}>{text.shop.addToCart}</p>
        </CartButton>
      )}
    </div>
  );
};

export default ProductCard;
