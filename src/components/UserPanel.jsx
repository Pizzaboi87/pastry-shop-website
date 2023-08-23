import UserAccountImage from "./UserAccountImage";
import Loading from "./Loading";
import { useContext } from "react";
import { UserContext } from "../context";
import { Theme_Div } from "../styles";

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
        className="xl:col-span-5 col-span-6 rounded-2xl shadow-inner shadow-black xl:p-12 p-6"
      >
        {children}
      </Theme_Div>
    </>
  );
};

export default UserPanel;
