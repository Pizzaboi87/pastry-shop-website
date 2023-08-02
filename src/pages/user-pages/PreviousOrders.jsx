import { TransitionParent } from "../../components";
import { otherText } from "../../constants";
import { userPageStyle } from "../../styles";

const PreviousOrders = () => {
  return (
    <TransitionParent isFlex>
      <h1 className={userPageStyle.title}>{otherText.previousOrdersTitle}</h1>
    </TransitionParent>
  );
};

export default PreviousOrders;
