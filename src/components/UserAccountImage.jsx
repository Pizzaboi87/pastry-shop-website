import Swal from "sweetalert2";
import { useRef } from "react";
import { updateUserData, uploadUserImage } from "../utils/firebase";
import { Icon } from "@iconify/react";

const UserAccountImage = ({ userData, userImage, currentUser }) => {
  const fileInputRef = useRef(null);

  const handleChangeImage = (event) => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    updateUserData(currentUser.uid, {
      photoExtension: file.name.split(".").pop(),
    }).then(() => {
      uploadUserImage(currentUser.uid, file).then(() => {
        Swal.fire({
          icon: "success",
          title: "Image updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    });

    console.log(file);
  };

  return (
    <div className="col-span-1 flex flex-col items-center gap-y-2 sticky top-36 h-fit">
      <div
        className="profilecontainer w-[10rem] h-[10rem] rounded-full border-white border-2 bg-center bg-cover overflow-hidden"
        style={{ backgroundImage: `url(${userImage})` }}
      >
        <div className="changeimage w-full h-full bg-[#ffffffbb] rounded-full flex items-center justify-center">
          <Icon
            icon="ri:image-edit-fill"
            className="text-[3rem] text-brown cursor-pointer"
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
