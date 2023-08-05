import { TransitionParent, UserPanel } from "../../components";
import { otherText } from "../../constants";
import { Theme_Div, Theme_H1, userPageStyle } from "../../styles";

const MyCart = () => {
  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 className={userPageStyle.title}>
        {otherText.myCartTitle}
      </Theme_H1>

      <UserPanel>
        <Theme_Div className="w-full h-[30rem]">My Cart</Theme_Div>
      </UserPanel>
    </TransitionParent>
  );
};

export default MyCart;
