import Swal from "sweetalert2";
import { uploadBlogPost, getAllPost } from "./firebase";

const updateData = async (setFirebaseData) => {
  try {
    const data = await getAllPost();
    setFirebaseData(data);
  } catch (error) {
    console.error("An error happened during data fetching.", error);
  }
};

export const deleteBlogPost = async (
  postid,
  setFirebaseData,
  setIsLoading,
  setResult,
  currentUser,
  text
) => {
  Swal.fire({
    title: text.blogAll.swal.question,
    showDenyButton: true,
    confirmButtonText: text.blogAll.swal.confirm,
    denyButtonText: text.blogAll.swal.cancel,
  }).then(async (result) => {
    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const idToken = await currentUser.getIdToken();

        const response = await fetch("/api/delete-post", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${idToken}`,
            "post-id": postid,
          },
        });

        if (response.ok) {
          Swal.fire({
            title: text.blogAll.swal.successTitle,
            text: text.blogAll.swal.successText,
            icon: "success",
          });
          await updateData(setFirebaseData);
          setIsLoading(false);
          setResult(true);
        } else {
          setIsLoading(false);
          Swal.fire({
            title: text.blogAll.swal.error,
            text: text.blogAll.swal.errorMsg,
            icon: "error",
          });
        }
      } catch (error) {
        setIsLoading(false);
        Swal.fire({
          title: text.blogAll.swal.error,
          text: text.blogAll.swal.errorMsg,
          icon: "error",
        });
        console.error("Error deleting post:", error);
      }
    } else if (result.isDenied) {
      return;
    }
  });
};

export const deleteUser = async (
  user,
  currentUser,
  text,
  refetch,
  setIsDeleting,
  setResult
) => {
  Swal.fire({
    title: text.userDetailsPage.swal.question,
    showDenyButton: true,
    confirmButtonText: text.userDetailsPage.swal.confirm,
    denyButtonText: text.userDetailsPage.swal.cancel,
  }).then(async (result) => {
    setIsDeleting(true);

    if (result.isConfirmed) {
      setIsDeleting(true);
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
          Swal.fire({
            title: text.userDetailsPage.swal.successTitle,
            text: text.userDetailsPage.swal.successText,
            icon: "success",
          });
          await refetch();
          setIsDeleting(false);
          setResult(true);
        } else {
          setIsDeleting(false);
          Swal.fire({
            title: text.userDetailsPage.swal.errorTitle,
            text: text.userDetailsPage.swal.errorDelete,
            icon: "error",
          });
        }
      } catch (error) {
        setIsDeleting(false);
        Swal.fire({
          title: text.userDetailsPage.swal.errorTitle,
          text: error.message,
          icon: "error",
        });
        console.error("Error deleting user:", error);
      }
    } else if (result.isDenied) {
      return;
    }
  });
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

export const uploadPost = async (currentUser, blogForm) => {
  try {
    const idToken = await currentUser.getIdToken();

    const response = await fetch("/api/store-post", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (response.ok) {
      await uploadBlogPost(blogForm);
    }
  } catch (error) {
    console.log(error);
  }
};
