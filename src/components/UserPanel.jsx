import UserAccountImage from "./UserAccountImage";
import Loading from "./Loading";
import { useContext } from "react";
import { UserContext } from "../context";

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

      <div className="col-span-5 bg-white rounded-2xl shadow-inner shadow-black p-12">
        {children}
      </div>
    </>
  );
};

export default UserPanel;
