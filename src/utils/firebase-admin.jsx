import Swal from "sweetalert2";
import { deleteUserFromDatabase, uploadBlogPost, deletePost } from "./firebase";

export const deleteBlogPost = async (
  postid,
  setAllBlogPost,
  currentUser,
  text,
  navigate
) => {
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
      await deletePost(postid)
        .then(() => {
          setAllBlogPost((prevPosts) =>
            prevPosts.filter((post) => post.postid !== postid)
          );
        })
        .then(() => {
          Swal.fire({
            title: text.blogAll.swal.successTitle,
            text: text.blogAll.swal.successText,
            icon: "success",
          });
        })
        .then(() => {
          navigate && navigate("/admin/blog/all");
        });
    }
  } catch (error) {
    Swal.fire({
      title: text.blogAll.swal.error,
      text: text.blogAll.swal.errorMsg,
      icon: "error",
    });
    console.error("Error deleting post:", error);
  }
};

export const deleteUser = async (user, currentUser, text, navigate) => {
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
        Swal.fire({
          title: text.userDetailsPage.swal.successTitle,
          text: text.userDetailsPage.swal.successText,
          icon: "success",
        });
        navigate("/admin/users/all");
      });
    } else {
      Swal.fire({
        title: text.userDetailsPage.swal.errorTitle,
        text: text.userDetailsPage.swal.errorDelete,
        icon: "error",
      });
    }
  } catch (error) {
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
