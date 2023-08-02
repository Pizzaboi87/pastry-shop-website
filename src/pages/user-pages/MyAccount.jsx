import { useContext } from "react";
import {
  Loading,
  TransitionParent,
  UserAccountForm,
  UserAccountImage,
} from "../../components";
import { otherText } from "../../constants";
import { UserContext } from "../../context";

const MyAccount = () => {
  const { userData, setUserData, userImage, currentUser } =
    useContext(UserContext);

  if (!userData) return <Loading />;

  return (
    <TransitionParent isFlex={false}>
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        {otherText.myAccountTitle}
      </h1>

      <UserAccountImage
        userData={userData}
        userImage={userImage}
        currentUser={currentUser}
      />

      <UserAccountForm
        userData={userData}
        setUserData={setUserData}
        currentUser={currentUser}
      />
    </TransitionParent>
  );
};

export default MyAccount;
