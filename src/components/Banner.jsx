import Category from "./Category";
import { UserContext } from "../context";
import { useContext, useState } from "react";
import { macBlue, macBrown, macGreen, macPurple, macYellow } from "../assets/";
import { Theme_Button, Theme_Div, shop } from "../styles";

const Banner = ({
  categories,
  products,
  categorySelector,
  setCategorySelector,
  setCategoryProducts,
  setTooShortTerm,
}) => {
  const { text, userLanguage } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const allowedChars =
    "^[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰűÇçÑñËëÈèÊêÂâÎîÔôÛûÀàÆæÅåØøÝýÞþß '-]+$";

  const searchProducts = (searchTerm) => {
    setTooShortTerm(false);
    setCategoryProducts(
      products.flatMap((obj) => {
        return Object.values(obj).filter((item) =>
          item.name[userLanguage].toLowerCase().includes(searchTerm)
        );
      })
    );
  };

  const defaultResult = () => {
    setTooShortTerm(false);
    setCategoryProducts(
      products.flatMap((obj) => {
        return Object.values(obj).filter(
          (item) => item.category === categorySelector
        );
      })
    );
  };

  const emptyResult = () => {
    setTooShortTerm(false);
    setCategoryProducts([]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value == "") {
      defaultResult();
    }
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      setTooShortTerm(false);
      return;
    }
    if (!searchTerm.match(allowedChars)) emptyResult();
    else if (searchTerm.length < 3) setTooShortTerm(true);
    else searchProducts(searchTerm.toLowerCase());
  };

  return (
    <Theme_Div
      $bgcolor="background"
      $bordercolor="transparent"
      className={shop.bannerContainer}
    >
      <div className={shop.formContainer}>
        <form className={shop.form} onSubmit={handleSubmit}>
          <input
            className={shop.input}
            type="text"
            placeholder={text.shop.searchBox}
            onChange={handleChange}
          />
          <Theme_Button
            $bgcolor="logo"
            $textcolor="textlight"
            $bordercolor="transparent"
            $hoverbgcolor="dark"
            $hovertextcolor="textlight"
            className={shop.button}
          >
            {text.shop.searchButton}
          </Theme_Button>
        </form>

        <div className={shop.categoryContainer}>
          {categories.map((category, index) => (
            <Category
              key={index}
              category={category}
              setCategorySelector={setCategorySelector}
            />
          ))}
        </div>
      </div>

      <div className={shop.millContainer}>
        <div className={shop.millBackground} />
        <div className={shop.macaronBlue}>
          <img src={macBlue} alt="macaron_blue" />
        </div>
        <div className={shop.macaronBrown}>
          <img src={macBrown} alt="macaron_brown" />
        </div>
        <div className={shop.macaronGreen}>
          <img src={macGreen} alt="macaron_green" />
        </div>
        <div className={shop.macaronPurple}>
          <img src={macPurple} alt="macaron_purple" />
        </div>
        <div className={shop.macaronYellow}>
          <img src={macYellow} alt="macaron_yellow" />
        </div>
      </div>
    </Theme_Div>
  );
};

export default Banner;
