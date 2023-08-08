import { useContext } from "react";
import { UserContext } from "../../context";
import { adminPageStyle } from "../../styles";

const ShopNew = () => {
  const { text } = useContext(UserContext);

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.shopNewTitle}</h1>
    </div>
  );
};

export default ShopNew;
