import { CartContext, UserContext } from "../../context";
import { Banner, ProductCard, TransitionParent } from "../../components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, getStoredImage } from "../../utils/firebase";
import {
  Theme_Button,
  Theme_Div,
  Theme_H1,
  shop,
  titleStyle,
} from "../../styles";
import { Icon } from "@iconify/react";

const Shop = () => {
  const navigate = useNavigate();

  const { text, userLanguage } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const [categorySelector, setCategorySelector] = useState("cakes");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsObj = await getData("products/");
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
    setCategories(text.shopCategories);
  }, [userLanguage]);

  useEffect(() => {
    const filteredProducts = products.flatMap((obj) => {
      return Object.values(obj).filter(
        (item) => item.category === categorySelector
      );
    });

    setCategoryProducts(filteredProducts);
  }, [products, categorySelector]);

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

      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        onClick={() => navigate("/mycart")}
        className={`${cart.length ? "visible" : "invisible"} ${
          shop.checkoutButton
        }`}
      >
        <Icon icon="carbon:shopping-cart" className={shop.checkoutIcon} />
        <p className={shop.checkoutText}>{text.shop.checkout}</p>
      </Theme_Button>

      <Theme_Div
        $bgcolor="background"
        $bordercolor="transparent"
        className={shop.productsContainer}
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
          <h1 className={shop.noResult}>{text.shop.noResult}</h1>
        )}
      </Theme_Div>
    </TransitionParent>
  );
};

export default Shop;
