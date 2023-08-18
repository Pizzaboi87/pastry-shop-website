import Swal from "sweetalert2";
import { getAllPost, storeImage } from "./firebase";

const updateData = async (setFirebaseData) => {
  try {
    const data = await getAllPost();
    setFirebaseData(data);
  } catch (error) {
    console.error("An error happened during data fetching.", error);
  }
};

export const deleteComment = async (
  id,
  text,
  currentUser,
  navigate,
  setAllComments,
  setIsDeleting
) => {
  Swal.fire({
    title: text.blogCommentPage.swal.question,
    showDenyButton: true,
    confirmButtonText: text.blogCommentPage.swal.confirm,
    denyButtonText: text.blogCommentPage.swal.cancel,
  }).then(async (result) => {
    setIsDeleting(true);
    if (result.isConfirmed) {
      try {
        const idToken = await currentUser.getIdToken();

        const response = await fetch("/api/delete-comment", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${idToken}`,
            "comment-id": id,
          },
        });

        if (response.ok) {
          Swal.fire({
            title: text.blogCommentPage.swal.successTitle,
            text: text.blogCommentPage.swal.successText,
            icon: "success",
          });
          setAllComments((prevComments) =>
            prevComments.filter((comm) => comm.id !== id)
          );
          setIsDeleting(false);
          navigate("/admin/blog/comments");
        } else {
          setIsDeleting(false);
          throw new Error("Comment deletion failed.");
        }
      } catch (error) {
        setIsDeleting(false);
        Swal.fire({
          title: text.blogCommentPage.swal.errorTitle,
          text: text.blogCommentPage.swal.errorText,
          icon: "error",
        });
        console.error("Error deleting comment:", error);
      }
    } else if (result.isDenied) {
      return;
    }
  });
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

export const uploadPost = async (
  text,
  currentUser,
  blogForm,
  setIsLoading,
  setFirebaseData,
  navigate
) => {
  setIsLoading(true);
  try {
    const idToken = await currentUser.getIdToken();
    await storeImage(blogForm.imageFile, blogForm.image);

    const response = await fetch("/api/store-post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(blogForm),
    });

    if (response.ok) {
      await updateData(setFirebaseData);
      setIsLoading(false);
      Swal.fire({
        title: text.blogForm.swal.successTitle,
        text: text.blogForm.swal.successMessage,
        icon: "success",
      });
      navigate("/admin/blog/all");
    } else {
      setIsLoading(false);
      Swal.fire({
        title: text.blogForm.swal.errorTitle,
        text: text.blogForm.swal.errorMessage,
        icon: "error",
      });
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
    Swal.fire({
      title: text.blogForm.swal.errorTitle,
      text: text.blogForm.swal.errorMessage,
      icon: "error",
    });
  }
};
