import { TransitionParent, UserPanel } from "../../components";
import { otherText } from "../../constants";
import { userPageStyle } from "../../styles";

const PreviousOrders = () => {
  return (
    <TransitionParent isFlex={false}>
      <h1 className={userPageStyle.title}>{otherText.previousOrdersTitle}</h1>

      <UserPanel>
        <div className="w-full h-[30rem] bg-purple"></div>
      </UserPanel>
    </TransitionParent>
  );
};

export default PreviousOrders;
