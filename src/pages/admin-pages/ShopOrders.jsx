import { otherText } from "../../constants";
import { adminPageStyle } from "../../styles";

const ShopOrders = () => {
  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{otherText.shopOrdersTitle}</h1>
    </div>
  );
};

export default ShopOrders;
