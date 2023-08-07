import { useContext } from "react";
import { text } from "../../constants";
import { UserContext } from "../../context";
import { Theme_H1, userPageStyle } from "../../styles";
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
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.myAccountTitle}
      </Theme_H1>

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
