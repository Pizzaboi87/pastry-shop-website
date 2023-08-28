import UserAccountImage from "./UserAccountImage";
import Loading from "./Loading";
import { UserContext } from "../context";
import { useContext } from "react";
import { Theme_Div, userPanelStyle } from "../styles";

const UserPanel = ({ children }) => {
  const { userData, userImage, setUserImage, currentUser } =
    useContext(UserContext);

  if (!userData || !userImage) return <Loading />;

  return (
    <>
      <UserAccountImage
        userData={userData}
        userImage={userImage}
        setUserImage={setUserImage}
        currentUser={currentUser}
      />

      <Theme_Div
        $bgcolor="background"
        $bordercolor="transparent"
        className={userPanelStyle.container}
      >
        {children}
      </Theme_Div>
    </>
  );
};

export default UserPanel;
