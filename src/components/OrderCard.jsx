import Swal from "sweetalert2";
import { useContext } from "react";
import { CartButtons } from ".";
import { UserContext } from "../context";
import { orderCardStyle } from "../styles";

const OrderCard = ({ product, quantity, lang }) => {
  const { currency, text } = useContext(UserContext);

  const currencyCorr = (price) => {
    if (currency.name === "HUF") {
      return Math.ceil((price * currency.value) / 100) * 100;
    } else {
      return (price * currency.value).toFixed(1);
    }
  };

  const viewImage = () => {
    Swal.fire({
      imageUrl: product.image,
      imageAlt: product.name[lang],
      showConfirmButton: false,
      showCloseButton: false,
      background: "#fff",
      padding: "1rem",
    });
  };

  return (
    <div className={orderCardStyle.wrapper}>
      <img
        src={product.image}
        alt={product.name[lang]}
        onClick={viewImage}
        className={orderCardStyle.image}
      />

      <div className={orderCardStyle.detailsWrapper}>
        <span className={orderCardStyle.span}>
          <p className={orderCardStyle.details}>{text.orderCard.name}</p>
          <p>{product.name[lang]}</p>
        </span>
        <span className={orderCardStyle.span}>
          <p className={orderCardStyle.details}>{text.orderCard.details}</p>
          <p>{product.comment}</p>
        </span>
        <span className={orderCardStyle.span}>
          <p className={orderCardStyle.details}>{text.orderCard.price}</p>
          <p>{`${currencyCorr(product.price)} ${currency.symbol}`}</p>
        </span>
        <span className={orderCardStyle.span}>
          <p className={orderCardStyle.details}>{text.orderCard.quantity}</p>
          <p>{quantity}</p>
        </span>
      </div>

      <p className={orderCardStyle.price}>
        {`${(currencyCorr(product.price) * quantity)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.symbol}`}
      </p>

      <div className={orderCardStyle.buttonContainer}>
        <CartButtons product={product} />
      </div>
    </div>
  );
};

export default OrderCard;
