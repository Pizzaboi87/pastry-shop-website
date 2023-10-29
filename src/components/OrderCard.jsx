import Swal from "sweetalert2";
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
    <div className="xl:w-[95%] w-full mx-auto rounded-xl justify-between grid grid-cols-6 mb-6 bg-white p-2">
      <img
        src={product.image}
        alt={product.name[lang]}
        onClick={viewImage}
        className="md:col-span-1 xs:col-span-2 col-span-6 mx-auto rounded-xl w-[6rem] h-[6rem] object-cover xl:cursor-zoom-in xl:hover:scale-[200%] xl:hover:border xl:hover:border-1 transition-all duration-500 ease-in-out"
      />

      <div className="md:col-span-2 xs:col-span-4 col-span-6 pl-4 mb-2 md:mb-0 flex flex-col justify-start">
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

      <p className="md:col-span-1 xs:col-start-5 xs:col-span-2 col-span-6 mb-2 md:mb-0 self-center justify-self-end md:pr-6 whitespace-nowrap text-[1.8rem] font-[600]">
        {`${currencyCorr(product.price * quantity)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.symbol}`}
      </p>

      <div className="md:col-span-2 col-span-6 flex items-center justify-center">
        <CartButtons product={product} />
      </div>
    </div>
  );
};

export default OrderCard;
