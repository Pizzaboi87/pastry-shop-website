import { useContext } from "react";
import { CartButtons } from ".";
import { UserContext } from "../context";

const OrderCard = ({ product, quantity, lang }) => {
  const { currency } = useContext(UserContext);

  const currencyCorr = (price) => {
    if (currency.name === "HUF") {
      return Math.ceil((price * currency.value) / 100) * 100;
    } else {
      return (price * currency.value).toFixed(1);
    }
  };

  return (
    <div className="w-[85%] mx-auto rounded-xl justify-between grid grid-cols-6 mb-6 bg-white p-2">
      <img
        src={product.image}
        alt={product.name[lang]}
        className="rounded-xl w-[6rem] h-[6rem] object-cover"
      />

      <div className="col-span-2 flex flex-col justify-start">
        <span className="flex gap-2">
          <p className="text-[1rem] font-[600]">Name:</p>
          <p>{product.name[lang]}</p>
        </span>
        <span className="flex gap-2">
          <p className="text-[1rem] font-[600]">Details:</p>
          <p>{product.comment}</p>
        </span>
        <span className="flex gap-2">
          <p className="text-[1rem] font-[600]">Price:</p>
          <p>{`${currencyCorr(product.price)} ${currency.symbol}`}</p>
        </span>
        <span className="flex gap-2">
          <p className="text-[1rem] font-[600]">Quantity:</p>
          <p>{quantity}</p>
        </span>
      </div>

      <p className="col-span-2 self-center justify-self-end pr-24 text-[1.8rem] font-[600]">
        {`${currencyCorr(product.price * quantity)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.symbol}`}
      </p>

      <div className="flex items-center justify-center">
        <CartButtons product={product} />
      </div>
    </div>
  );
};

export default OrderCard;
