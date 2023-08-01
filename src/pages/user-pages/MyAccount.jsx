import prfileImage from "../../assets/rewprof-1.webp";
import { useContext } from "react";
import { Loading, TransitionParent, UserAccountForm } from "../../components";
import { otherText } from "../../constants";
import { UserContext } from "../../context";

const MyAccount = () => {
  const { userData } = useContext(UserContext);

  if (!userData) return <Loading />;

  return (
    <TransitionParent isFlex={false}>
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        {otherText.myAccountTitle}
      </h1>

      <div className="col-span-1 flex flex-col items-center gap-y-2 sticky top-36 h-fit">
        <img
          src={prfileImage}
          alt="profile"
          className="w-full rounded-full border-white border-2"
        />
        <h1 className="text-text text-[1.4rem] font-[600]">
          {userData.displayName}
        </h1>
      </div>

      <div className="col-span-5 bg-white rounded-2xl shadow-inner shadow-black">
        <UserAccountForm userData={userData} />
      </div>
    </TransitionParent>
  );
};

export default MyAccount;
