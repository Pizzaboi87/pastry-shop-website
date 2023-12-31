import { Navigate } from "react-router-dom";
import { UserContext } from "../../context";
import { useContext } from "react";
import { Theme_H1, userPageStyle } from "../../styles";
import {
  Loading,
  TransitionParent,
  UserAccountForm,
  UserPanel,
} from "../../components";

const MyAccount = () => {
  const { userData, setUserData, currentUser, text } = useContext(UserContext);

  if (!currentUser) return <Navigate to="/auth" />;

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
