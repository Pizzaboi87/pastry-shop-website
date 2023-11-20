import { ProductContext, UserContext } from "../../context";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Loading } from "../../components";
import { useContext, useEffect, useState } from "react";
import { adminPageStyle, shopAllStyle } from "../../styles";
import { deleteProduct } from "../../utils/firebase-admin";
import { useSwalMessage } from "../../utils/useSwalMessage";

const ShopAll = () => {
  const { text, currentUser, userLanguage } = useContext(UserContext);
  const { setFirebaseProducts, allProducts, setLoading, loading } =
    useContext(ProductContext);
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("beverages");

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  const confirmDelete = async (id, category, image) => {
    await deleteProduct(
      id,
      category,
      image,
      setFirebaseProducts,
      setLoading,
      currentUser,
      text,
      showErrorSwal,
      showSuccessSwal,
      showQuestionSwal
    );
  };

  if (loading) return <Loading />;

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.shopAllTitle}</h1>

      <div className={shopAllStyle.buttonContainer}>
        {text.productForm.category.map((category) => (
          <button
            key={category.id}
            className={shopAllStyle.button}
            onClick={() => setFilter(category.branch)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className={shopAllStyle.container}>
        {products
          .filter((item) => item.category == filter)
          .map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className={shopAllStyle.productContainer}
            >
              <img
                src={product.imageURL}
                alt="product"
                className={shopAllStyle.image}
              />

              <div className={shopAllStyle.filter}>
                <div className={shopAllStyle.content}>
                  <Icon
                    icon="bi:trash3-fill"
                    className={shopAllStyle.icon}
                    onClick={() =>
                      confirmDelete(product.id, product.category, product.image)
                    }
                  />
                  <Link to={product.id} className={shopAllStyle.icon}>
                    <Icon icon="raphael:edit" />
                  </Link>
                </div>
                <div
                  className={`${shopAllStyle.titleContainer} ${shopAllStyle.bg}`}
                ></div>
              </div>
              <div
                className={`${shopAllStyle.titleContainer} ${shopAllStyle.flex}`}
              >
                <h1 className={shopAllStyle.title}>
                  {product.name[userLanguage]}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShopAll;
