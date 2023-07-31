import { TransitionParent } from "../../components";
import { otherText } from "../../constants";

const MyAccount = () => {
  return (
    <TransitionParent isFlex>
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        {otherText.myAccountTitle}
      </h1>
    </TransitionParent>
  );
};

export default MyAccount;
