import { TransitionParent, UserPanel } from "../../components";
import { text } from "../../constants";
import { Theme_H1, userPageStyle } from "../../styles";

const PreviousOrders = () => {
  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.previousOrdersTitle}
      </Theme_H1>

      <UserPanel>
        <div className="w-full h-[30rem] bg-purple"></div>
      </UserPanel>
    </TransitionParent>
  );
};

export default PreviousOrders;
