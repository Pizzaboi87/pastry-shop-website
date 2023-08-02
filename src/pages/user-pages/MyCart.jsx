import { TransitionParent, UserPanel } from "../../components";
import { otherText } from "../../constants";
import { userPageStyle } from "../../styles";

const MyCart = () => {
  return (
    <TransitionParent isFlex={false}>
      <h1 className={userPageStyle.title}>{otherText.myCartTitle}</h1>

      <UserPanel>
        <div className="w-full h-[30rem] bg-red"></div>
      </UserPanel>
    </TransitionParent>
  );
};

export default MyCart;
