import { getAllComments, getAllPost } from "./firebase";

const updateData = async (setFirebaseData, userLanguage) => {
  try {
    const data = await getAllPost(userLanguage);
    setFirebaseData(data);
  } catch (error) {
    console.error("An error happened during data fetching.", error);
  }
};

const updateComments = async (setFirebaseComments) => {
  try {
    const data = await getAllComments();
    setFirebaseComments(data);
  } catch (error) {
    console.error("An error happened during data fetching.", error);
  }
};

export const deleteComment = async (
  id,
  text,
  currentUser,
  navigate,
  setFirebaseComments,
  setIsDeleting,
  showErrorSwal,
  showSuccessSwal,
  showQuestionSwal
) => {
  await showQuestionSwal(text.blogCommentPage.swal.question).then(
    async (result) => {
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
            showSuccessSwal(text.blogCommentPage.swal.successText);
            await updateComments(setFirebaseComments);
            setIsDeleting(false);
            navigate("/admin/blog/comments");
          } else {
            setIsDeleting(false);
            throw new Error("Comment deletion failed.");
          }
        } catch (error) {
          setIsDeleting(false);
          showErrorSwal(text.blogCommentPage.swal.errorText);
          console.error("Error deleting comment:", error);
        }
      } else if (result.isDenied) {
        return;
      }
    }
  );
};

export const deleteBlogPost = async (
  postid,
  setFirebaseData,
  setIsLoading,
  setResult,
  currentUser,
  text,
  userLanguage,
  showErrorSwal,
  showSuccessSwal,
  showQuestionSwal
) => {
  await showQuestionSwal(text.blogAll.swal.question).then(async (result) => {
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
          showSuccessSwal(text.blogAll.swal.successText);
          await updateData(setFirebaseData, userLanguage);
          setIsLoading(false);
          setResult(true);
        } else {
          setIsLoading(false);
          showErrorSwal(text.blogAll.swal.errorMsg);
        }
      } catch (error) {
        setIsLoading(false);
        showErrorSwal(text.blogAll.swal.errorMsg);
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
  setResult,
  showErrorSwal,
  showSuccessSwal,
  showQuestionSwal
) => {
  await showQuestionSwal(text.userDetailsPage.swal.question).then(
    async (result) => {
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
            showSuccessSwal(text.userDetailsPage.swal.successText);
            await refetch();
            setIsDeleting(false);
            setResult(true);
          } else {
            setIsDeleting(false);
            showErrorSwal(text.userDetailsPage.swal.errorDelete);
          }
        } catch (error) {
          setIsDeleting(false);
          showErrorSwal(error.message);
          console.error("Error deleting user:", error);
        }
      } else if (result.isDenied) {
        return;
      }
    }
  );
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
  showErrorSwal,
  showSuccessSwal
) => {
  setIsLoading(true);
  try {
    const idToken = await currentUser.getIdToken();

    const response = await fetch("/api/store-post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(blogForm),
    });

    if (response.ok) {
      setIsLoading(false);
      showSuccessSwal(text.blogForm.swal.successMessage);
    } else {
      setIsLoading(false);
      showErrorSwal(text.blogForm.swal.errorMessage);
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
    showErrorSwal(text.blogForm.swal.errorMessage);
  }
};
