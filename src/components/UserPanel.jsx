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
        className="col-span-5 rounded-2xl shadow-inner shadow-black p-12"
      >
        {children}
      </Theme_Div>
    </>
  );
};

export default UserPanel;