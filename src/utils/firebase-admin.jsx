import Swal from "sweetalert2";
import { deleteUserFromDatabase } from "./firebase";

export const deleteUser = async (
  user,
  setIsLoading,
  currentUser,
  text,
  navigate
) => {
  try {
    const idToken = await currentUser.getIdToken();

    const response = await fetch("/api/delete-user", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "user-id": user.uid,
      },
    });

    if (response.ok) {
      await deleteUserFromDatabase(user).then(() => {
        setIsLoading(false);
        Swal.fire({
          title: text.userDetailsPage.swal.successTitle,
          text: text.userDetailsPage.swal.successText,
          icon: "success",
        });
        navigate("/admin/users/all");
      });
    } else {
      setIsLoading(false);
      Swal.fire({
        title: text.userDetailsPage.swal.errorTitle,
        text: text.userDetailsPage.swal.errorDelete,
        icon: "error",
      });
    }
  } catch (error) {
    setIsLoading(false);
    Swal.fire({
      title: text.userDetailsPage.swal.errorTitle,
      text: error.message,
      icon: "error",
    });
  }
};

export const getAllUser = async (currentUser) => {
  try {
    const idToken = await currentUser.getIdToken();

    const response = await fetch("/api/get-all-user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
