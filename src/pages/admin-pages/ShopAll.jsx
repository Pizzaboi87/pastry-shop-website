import { otherText } from "../../constants";
import { adminPageStyle } from "../../styles";

const ShopAll = () => {
  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{otherText.shopAllTitle}</h1>
    </div>
  );
};

export default ShopAll;
