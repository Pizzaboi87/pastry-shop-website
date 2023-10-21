import { UserContext } from "../../context";
import { Banner, ProductCard, TransitionParent } from "../../components";
import { useContext, useEffect, useState } from "react";
import { Theme_Div, Theme_H1, titleStyle } from "../../styles";
import { getAllProducts } from "../../utils/firebase";

const Shop = () => {
  const { text } = useContext(UserContext);
  const [categorySelector, setCategorySelector] = useState("gifts");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async (productType) => {
      const productsObj = await getAllProducts(productType);
      const productIds = Object.keys(productsObj);
      const productsArray = productIds.map(
        (productId) => productsObj[productId]
      );
      setProducts(productsArray);
    };

    getProducts(categorySelector);
  }, [categorySelector]);

  //Temporary declaration place for data
  const categories = [
    { icon: "emojione-v1:shortcake", title: "Cakes", select: "cakes" },
    { icon: "noto:beverage-box", title: "Coolers", select: "beverages" },
    { icon: "noto:wrapped-gift", title: "Gifts", select: "gifts" },
    {
      icon: "streamline-emojis:cocktail-glass",
      title: "Drinks",
      select: "drinks",
    },
    { icon: "noto:sandwich", title: "Foods", select: "foods" },
    {
      icon: "vscode-icons:file-type-coffeescript",
      title: "Coffees",
      select: "coffees",
    },
  ];

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.shopTitle}
      </Theme_H1>

      <Banner
        categories={categories}
        setCategorySelector={setCategorySelector}
      />

      <Theme_Div
        $bgcolor="background"
        $bordercolor="transparent"
        className="flex gap-8 flex-wrap shadow-inner shadow-black items-center justify-center xl:w-[85vw] w-full rounded-xl py-8 mt-16"
      >
        {products.map((product, index) => (
          <ProductCard
            key={index}
            category={categorySelector}
            product={product}
          />
        ))}
      </Theme_Div>
    </TransitionParent>
  );
};

export default Shop;
