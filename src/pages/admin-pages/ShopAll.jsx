import { text } from "../../constants";
import { adminPageStyle } from "../../styles";

const ShopAll = () => {
  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.shopAllTitle}</h1>
    </div>
  );
};

export default ShopAll;
