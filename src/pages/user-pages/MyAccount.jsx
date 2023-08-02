import { useContext } from "react";
import { otherText } from "../../constants";
import { UserContext } from "../../context";
import { userPageStyle } from "../../styles";
import {
  Loading,
  TransitionParent,
  UserAccountForm,
  UserPanel,
} from "../../components";

const MyAccount = () => {
  const { userData, setUserData, currentUser } = useContext(UserContext);

  if (!userData) return <Loading />;

  return (
    <TransitionParent isFlex={false}>
      <h1 className={userPageStyle.title}>{otherText.myAccountTitle}</h1>

      <UserPanel>
        <UserAccountForm
          userData={userData}
          setUserData={setUserData}
          currentUser={currentUser}
        />
      </UserPanel>
    </TransitionParent>
  );
};

export default MyAccount;
