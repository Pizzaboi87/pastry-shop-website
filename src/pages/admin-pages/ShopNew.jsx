import { ProductForm } from "../../components";
import { UserContext } from "../../context";
import { useContext } from "react";
import { adminPageStyle } from "../../styles";

const ShopNew = () => {
  const { text } = useContext(UserContext);

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.shopNewTitle}</h1>
      <ProductForm />
    </div>
  );
};

export default ShopNew;
