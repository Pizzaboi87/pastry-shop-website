import { TransitionParent } from "../../components";
import { text } from "../../constants";
import { Theme_H1, titleStyle } from "../../styles";

const Shop = () => {
  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.shopTitle}
      </Theme_H1>
    </TransitionParent>
  );
};

export default Shop;
