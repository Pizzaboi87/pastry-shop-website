import { useContext } from "react";
import { UserContext } from "../../context";
import { adminPageStyle } from "../../styles";

const ShopOrders = () => {
  const { text } = useContext(UserContext);

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.shopOrdersTitle}</h1>
    </div>
  );
};

export default ShopOrders;
