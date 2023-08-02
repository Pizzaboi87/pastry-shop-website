import { useContext } from "react";
import { Loading, TransitionParent, UserAccountForm } from "../../components";
import { otherText } from "../../constants";
import { UserContext } from "../../context";
import { Icon } from "@iconify/react";

const MyAccount = () => {
  const { userData, setUserData, userImage, currentUser } =
    useContext(UserContext);

  if (!userData) return <Loading />;

  return (
    <TransitionParent isFlex={false}>
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        {otherText.myAccountTitle}
      </h1>

      <div className="col-span-1 flex flex-col items-center gap-y-2 sticky top-36 h-fit">
        <div
          className="profilecontainer w-[10rem] h-[10rem] rounded-full border-white border-2 bg-center bg-cover overflow-hidden"
          style={{ backgroundImage: `url(${userImage})` }}
        >
          <div className="changeimage w-full h-full bg-[#ffffffbb] rounded-full flex items-center justify-center">
            <Icon
              icon="ri:image-edit-fill"
              className="text-[3rem] text-brown cursor-pointer"
            />
          </div>
        </div>
        <h1 className="text-text text-[1.4rem] font-[600]">
          {userData.displayName}
        </h1>
      </div>

      <div className="col-span-5 bg-white rounded-2xl shadow-inner shadow-black">
        <UserAccountForm
          userData={userData}
          setUserData={setUserData}
          currentUser={currentUser}
        />
      </div>
    </TransitionParent>
  );
};

export default MyAccount;
