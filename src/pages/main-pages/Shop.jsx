import { TransitionParent } from "../../components";
import { otherText } from "../../constants";
import { Theme_H1, titleStyle } from "../../styles";

const Shop = () => {
  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {otherText.shopTitle}
      </Theme_H1>
    </TransitionParent>
  );
};

export default Shop;
