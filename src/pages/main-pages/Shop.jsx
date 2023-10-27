import { UserContext } from "../../context";
import { Banner, ProductCard, TransitionParent } from "../../components";
import { useContext, useEffect, useState } from "react";
import { Theme_Div, Theme_H1, titleStyle } from "../../styles";
import { getAllProducts, getStoredImage } from "../../utils/firebase";

const Shop = () => {
  const { text } = useContext(UserContext);
  const [categorySelector, setCategorySelector] = useState("gifts");
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsObj = await getAllProducts();
      const productsArray = Object.values(productsObj);

      const updatedProducts = await Promise.all(
        productsArray.map(async (product) => {
          const updatedProduct = await Promise.all(
            Object.values(product).map(async (innerProduct) => {
              if (innerProduct.category && innerProduct.image) {
                const image = await getStoredImage(
                  `products/${innerProduct.category}/${innerProduct.image}`
                );
                innerProduct.image = image;
              }
              return innerProduct;
            })
          );
          return updatedProduct;
        })
      );

      setProducts(updatedProducts);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = products.flatMap((obj) => {
      return Object.values(obj).filter(
        (item) => item.category === categorySelector
      );
    });

    setCategoryProducts(filteredProducts);
  }, [products, categorySelector]);

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
        products={products}
        categorySelector={categorySelector}
        setCategorySelector={setCategorySelector}
        setCategoryProducts={setCategoryProducts}
      />

      <Theme_Div
        $bgcolor="background"
        $bordercolor="transparent"
        className="flex gap-8 flex-wrap shadow-inner shadow-black items-center justify-center xl:w-[85vw] w-full rounded-xl py-8 mt-16"
      >
        {categoryProducts.length ? (
          categoryProducts.map((product, index) => (
            <ProductCard
              key={index}
              category={categorySelector}
              product={product}
            />
          ))
        ) : (
          <h1 className="tex-text text-[1.5rem] font-[500]">
            {text.shop.noResult}
          </h1>
        )}
      </Theme_Div>
    </TransitionParent>
  );
};

export default Shop;
