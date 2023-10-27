import { Icon } from "@iconify/react";
import { useContext } from "react";
import { UserContext } from "../context";
import { Theme_Button, Theme_Div } from "../styles";

const ProductCard = ({ category, product }) => {
  const { userLanguage, currency } = useContext(UserContext);

  const currencyCorr = (price) => {
    if (currency.name === "HUF") {
      return Math.ceil((price * currency.value) / 100) * 100;
    } else {
      return (price * currency.value).toFixed(1);
    }
  };

  return (
    <div className="w-[15rem] h-[30rem] relative flex flex-col rounded-xl">
      <Theme_Div
        $bgcolor="transparent"
        $bordercolor="logo"
        className="w-full h-[15rem] rounded-t-xl overflow-hidden border-[0.5px]"
      >
        <div
          className="w-full h-full bg-contain bg-no-repeat bg-center hover:scale-[120%] transition duration-300 ease-in-out cursor-pointer"
          style={{ backgroundImage: `url(${product.image})` }}
        />
      </Theme_Div>

      <div className="w-full h-[0.4rem] bg-transparent" />

      <Theme_Div
        $bgcolor="secondary"
        $bordercolor="logo"
        className="w-full min-h-[10rem] shadow-xl p-4 flex flex-col relative border-[0.5px]"
      >
        <span className="flex text-[#f70] self-center mt-2">
          {Array.from({ length: product.rate }, (v, i) => i).map((_, index) => (
            <Icon key={index} icon="carbon-star-filled" />
          ))}
          {Array.from({ length: 5 - product.rate }, (v, i) => i).map(
            (_, index) => (
              <Icon key={index} icon="carbon-star" />
            )
          )}
        </span>
        <h1 className="self-center text-center font-[600] my-2">
          {product.name[userLanguage]}
        </h1>
        <h2 className="self-center text-center font-[400]">
          {product.comment}
        </h2>
        <h3 className="absolute self-end bottom-2 text-[1.5rem] font-[700]">{`${currencyCorr(
          product.price
        )} ${currency.symbol}`}</h3>
      </Theme_Div>

      <div className="w-full h-[0.4rem] bg-transparent" />

      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className="w-full h-[3rem] bottom-0 rounded-b-xl shadow-xl flex items-center gap-1 justify-center"
      >
        <Icon icon="grommet-icons:cart" />
        <p className="font-[600] py-1">Add to Cart</p>
      </Theme_Button>
    </div>
  );
};

export default ProductCard;
