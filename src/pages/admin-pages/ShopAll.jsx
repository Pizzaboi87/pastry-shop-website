import { UserContext } from "../../context";
import { useContext } from "react";
import { adminPageStyle } from "../../styles";

const ShopAll = () => {
  const { text } = useContext(UserContext);

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.shopAllTitle}</h1>
    </div>
  );
};

export default ShopAll;
