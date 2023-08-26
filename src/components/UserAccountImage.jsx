import { useRef, useContext } from "react";
import { UserContext } from "../context";
import { getUserImage, uploadUserImage } from "../utils/firebase";
import { Theme_Icon } from "../styles";
import { useSwalMessage } from "../utils/useSwalMessage";

const UserAccountImage = ({
  userData,
  userImage,
  setUserImage,
  currentUser,
}) => {
  const { text } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();
  const fileInputRef = useRef(null);

  const handleChangeImage = (event) => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const extension = file.name.split(".").pop();
    const validExtensions = ["jpg", "jpeg", "png", "webp", "bmp", "svg"];
    if (validExtensions.some((ext) => extension.includes(ext))) {
      uploadUserImage(currentUser.uid, file)
        .then(() => {
          getUserImage(currentUser.uid).then((url) => setUserImage(url));
          showSuccessSwal(text.userAccountImage.swal.successMessage);
        })
        .catch((error) => {
          console.error("An error occured during the image upload:", error);
          showErrorSwal(text.userAccountImage.swal.errorMessage);
        });
    } else {
      showErrorSwal(text.userAccountImage.swal.errorType);
    }
  };

  return (
    <div className="xl:col-span-1 col-span-6 flex flex-col items-center gap-y-2 xl:sticky top-36 h-fit">
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
