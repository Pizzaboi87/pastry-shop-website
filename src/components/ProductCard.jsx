import Swal from "sweetalert2";
import CartButtons, { CartButton } from "./CartButtons";
import { Icon } from "@iconify/react";
import { CartContext, UserContext } from "../context";
import { useContext } from "react";
import { Theme_Div, shop } from "../styles";
import { useCurrency } from "../utils/useCurrency";

const ProductCard = ({ product }) => {
  const { text, userLanguage, currency } = useContext(UserContext);
  const { pricePerItem } = useCurrency(currency, product.price, 1);
  const { cart } = useContext(CartContext);

  const viewImage = () => {
    Swal.fire({
      imageUrl: product.image,
      imageAlt: product.name[userLanguage],
      showConfirmButton: false,
      showCloseButton: false,
      background: "#fff",
      padding: "1rem",
    });
  };

  return (
    <div className={shop.cardContainer}>
      <Theme_Div
        $bgcolor="transparent"
        $bordercolor="logo"
        onClick={viewImage}
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
        <h3
          className={shop.productPrice}
        >{`${pricePerItem} ${currency.symbol}`}</h3>
      </Theme_Div>

      <div className={shop.cardSpace} />

      {cart.find((item) => item.product.id === product.id) ? (
        <CartButtons product={product} />
      ) : (
        <CartButton isPlusItem product={product}>
          <Icon icon="carbon:shopping-cart" className={shop.icon} />
          <p className={shop.cardButtonText}>{text.shop.addToCart}</p>
        </CartButton>
      )}
    </div>
  );
};

export default ProductCard;
