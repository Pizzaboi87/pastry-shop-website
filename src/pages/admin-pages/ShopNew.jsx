import { otherText } from "../../constants";
import { adminPageStyle } from "../../styles";

const ShopNew = () => {
  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{otherText.shopNewTitle}</h1>
    </div>
  );
};

export default ShopNew;
