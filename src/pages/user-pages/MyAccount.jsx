import { useContext } from "react";
import { otherText } from "../../constants";
import { UserContext } from "../../context";
import { userPageStyle } from "../../styles";
import {
  Loading,
  TransitionParent,
  UserAccountForm,
  UserAccountImage,
} from "../../components";

const MyAccount = () => {
  const { userData, setUserData, userImage, setUserImage, currentUser } =
    useContext(UserContext);

  if (!userData) return <Loading />;

  return (
    <TransitionParent isFlex={false}>
      <h1 className={userPageStyle.title}>{otherText.myAccountTitle}</h1>

      <UserAccountImage
        userData={userData}
        userImage={userImage}
        setUserImage={setUserImage}
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
