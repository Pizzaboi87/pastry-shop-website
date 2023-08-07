import { useContext } from "react";
import { LanguageContext } from "../../context";
import { TransitionParent } from "../../components";
import { Theme_H1, titleStyle } from "../../styles";

const Shop = () => {
  const { text } = useContext(LanguageContext);

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.shopTitle}
      </Theme_H1>
    </TransitionParent>
  );
};

export default Shop;
