import Swal from "sweetalert2";
import { useRef } from "react";
import { getUserImage, uploadUserImage } from "../utils/firebase";
import { text } from "../constants";
import { Theme_Icon } from "../styles";

const UserAccountImage = ({
  userData,
  userImage,
  setUserImage,
  currentUser,
}) => {
  const fileInputRef = useRef(null);

  const handleChangeImage = (event) => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    uploadUserImage(currentUser.uid, file)
      .then(() => {
        getUserImage(currentUser.uid).then((url) => setUserImage(url));
        Swal.fire({
          icon: "success",
          title: text.userAccountImage.swal.successMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("An error occured during the image upload:", error);
        Swal.fire({
          icon: "error",
          title: text.userAccountImage.swal.errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="col-span-1 flex flex-col items-center gap-y-2 sticky top-36 h-fit">
      <div
        className="profilecontainer w-[10rem] h-[10rem] rounded-full border-white border-2 bg-center bg-cover overflow-hidden"
        style={{ backgroundImage: `url(${userImage})` }}
      >
        <div className="changeimage w-full h-full bg-[#ffffffbb] rounded-full flex items-center justify-center">
          <Theme_Icon
            $iconcolor="title"
            icon="ri:image-edit-fill"
            className="text-[3rem] cursor-pointer"
            onClick={handleChangeImage}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      </div>
      <h1 className="text-text text-[1.4rem] font-[600]">
        {userData.displayName}
      </h1>
    </div>
  );
};

export default UserAccountImage;
