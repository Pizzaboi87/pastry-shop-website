import { TransitionParent } from "../../components";
import { otherText } from "../../constants";
import { userPageStyle } from "../../styles";

const MyCart = () => {
  return (
    <TransitionParent isFlex>
      <h1 className={userPageStyle.title}>{otherText.myCartTitle}</h1>
    </TransitionParent>
  );
};

export default MyCart;
