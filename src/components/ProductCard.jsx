import { Icon } from "@iconify/react";
import { UserContext } from "../context";
import { useContext } from "react";
import { Theme_Button, Theme_Div, shop } from "../styles";

const ProductCard = ({ product }) => {
  const { text, userLanguage, currency } = useContext(UserContext);

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
        <h2 className={shop.proudctComment}>{product.comment}</h2>
        <h3 className={shop.productPrice}>{`${currencyCorr(product.price)} ${
          currency.symbol
        }`}</h3>
      </Theme_Div>

      <div className={shop.cardSpace} />

      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className={shop.cardButton}
      >
        <Icon icon="grommet-icons:cart" />
        <p className={shop.cardButtonText}>{text.shop.addToCart}</p>
      </Theme_Button>
    </div>
  );
};

export default ProductCard;
