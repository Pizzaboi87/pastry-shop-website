import { UserContext } from "../../context";
import {
  Banner,
  Category,
  ProductCard,
  TransitionParent,
} from "../../components";
import { useContext, useEffect, useState } from "react";
import { Theme_Div, Theme_H1, titleStyle } from "../../styles";
import { getAllProducts } from "../../utils/firebase";

const Shop = () => {
  const { text, userLanguage } = useContext(UserContext);
  const [category, setCategory] = useState("gifts");
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

    getProducts(category);
  }, [category]);

  console.log(products);

  //Temporary declaration place for data
  const categories = [
    { icon: "emojione-v1:shortcake", title: "Cakes" },
    { icon: "noto:beverage-box", title: "Beverages" },
    { icon: "noto:wrapped-gift", title: "Gifts" },
    { icon: "streamline-emojis:cocktail-glass", title: "Drinks" },
    { icon: "noto:sandwich", title: "Foods" },
    { icon: "vscode-icons:file-type-coffeescript", title: "Coffees" },
  ];

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.shopTitle}
      </Theme_H1>

      <Banner />

      <div className="w-full h-[3rem] flex items-center justify-center gap-8">
        {categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>

      <Theme_Div
        $bgcolor="glasscard"
        $bordercolor="transparent"
        className="flex gap-8 flex-wrap items-center justify-center w-[85vw] rounded-xl py-8 mt-16"
      >
        {products.map((product, index) => (
          <ProductCard
            key={index}
            category={category}
            product={product}
            userLanguage={userLanguage}
          />
        ))}
      </Theme_Div>
    </TransitionParent>
  );
};

export default Shop;
