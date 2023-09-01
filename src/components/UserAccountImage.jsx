import { UserContext } from "../context";
import { useRef, useContext } from "react";
import { getUserImage, uploadUserImage } from "../utils/firebase";
import { useSwalMessage } from "../utils/useSwalMessage";
import { Theme_Icon, userAccountImageStyle } from "../styles";

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
    <div className={userAccountImageStyle.wrapper}>
      <div
        className={userAccountImageStyle.image}
        style={{ backgroundImage: `url(${userImage})` }}
      >
        <div className={userAccountImageStyle.inputWrapper}>
          <Theme_Icon
            $iconcolor="title"
            icon="ri:image-edit-fill"
            className={userAccountImageStyle.icon}
            onClick={handleChangeImage}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className={userAccountImageStyle.input}
          />
        </div>
      </div>
      <h1 className={userAccountImageStyle.name}>{userData.displayName}</h1>
    </div>
  );
};

export default UserAccountImage;
