import { BlogContext, ProductContext, UserContext } from "../../context";
import { BlogForm, Loading, ProductForm } from "../../components";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlogPost, deleteProduct } from "../../utils/firebase-admin";
import { useSwalMessage } from "../../utils/useSwalMessage";
import { adminPageStyle } from "../../styles";

const ShopItemEditPage = () => {
  const { allBlogPost, setFirebaseData } = useContext(BlogContext);
  const { text, currentUser, userLanguage } = useContext(UserContext);
  const { allProducts } = useContext(ProductContext);
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(false);
  const { id } = useParams();

  const product = allProducts.filter((product) => product.id === id)[0];
  const navigate = useNavigate();

  const confirmDelete = async (postid) => {
    await deleteProduct(
      postid,
      setFirebaseData,
      setIsLoading,
      setResult,
      currentUser,
      text,
      userLanguage,
      showErrorSwal,
      showSuccessSwal,
      showQuestionSwal
    );
  };

  useEffect(() => {
    if (result) navigate("/admin/blog/all");
  }, [product, result]);

  if (isLoading) return <Loading />;

  return (
    <div className={adminPageStyle.wrapperRelative}>
      <h1 className={adminPageStyle.title}>{text.shopItemEditTitle}</h1>

      <Icon
        icon="bi:trash3-fill"
        className={adminPageStyle.icon}
        onClick={() => confirmDelete(product.id)}
      />

      <ProductForm dbProduct={product} />
    </div>
  );
};

export default ShopItemEditPage;
