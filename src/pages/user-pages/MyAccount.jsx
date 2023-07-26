import { TransitionParent } from "../../components";

const MyAccount = () => {
  return (
    <TransitionParent isFlex>
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        My Account User Page
      </h1>
    </TransitionParent>
  );
};

export default MyAccount;
