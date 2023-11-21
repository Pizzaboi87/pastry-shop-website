import { ProductContext, UserContext } from "../../context";
import { Loading, ProductForm } from "../../components";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct } from "../../utils/firebase-admin";
import { useSwalMessage } from "../../utils/useSwalMessage";
import { adminPageStyle } from "../../styles";

const ShopItemEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
  const { text, currentUser } = useContext(UserContext);
  const { allProducts, setFirebaseProducts, loading, setLoading } =
    useContext(ProductContext);

  const product = allProducts.filter((product) => product.id === id)[0];

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

    navigate("/admin/shop/products");
  };

  if (loading) return <Loading />;

  return (
    <div className={adminPageStyle.wrapperRelative}>
      <h1 className={adminPageStyle.title}>{text.shopItemEditTitle}</h1>

      <Icon
        icon="bi:trash3-fill"
        className={adminPageStyle.icon}
        onClick={() =>
          confirmDelete(product.id, product.category, product.image)
        }
      />

      <ProductForm dbProduct={product} />
    </div>
  );
};

export default ShopItemEditPage;
