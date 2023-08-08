import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CommentsContext, UserContext } from "../../context";
import { Icon } from "@iconify/react";
import { changeCommentStatus, deleteComment } from "../../utils/firebase";
import { adminPageStyle, blogNewFormStyle } from "../../styles";

const BlogCommentPage = () => {
  const { commentID } = useParams();
  const navigate = useNavigate();
  const { text } = useContext(UserContext);
  const { allComments, setAllComments } = useContext(CommentsContext);
  const actualComment = allComments.filter(
    (comment) => comment.id === commentID
  )[0];

  const changePublish = (comment) => {
    changeCommentStatus(comment.id, !comment.isPublished).then(() => {
      const newComments = allComments.map((com) =>
        com.id === comment.id ? { ...com, isPublished: !com.isPublished } : com
      );
      setAllComments(newComments);
    });
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: text.blogCommentPage.swal.question,
      showDenyButton: true,
      confirmButtonText: text.blogCommentPage.swal.confirm,
      denyButtonText: text.blogCommentPage.swal.cancel,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(id)
          .then(() => {
            setCommentForm(defaultForm);
          })
          .then(() => {
            navigate("/admin/blog/comments");
          })
          .catch((error) => {
            Swal.fire({
              title: text.blogAll.swal.error,
              text: text.blogAll.swal.errorMsg,
              icon: "error",
            });
            console.error("Error deleting comment:", error);
          });
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const defaultForm = {
    author: actualComment ? actualComment.author : "",
    email: actualComment ? actualComment.email : "",
    comment: actualComment ? actualComment.comment : "",
    date: actualComment
      ? new Date(actualComment.date)
          .toLocaleString("hu-HU", { timeZone: "Europe/Athens" })
          .slice(0, -3)
      : "",
    id: actualComment ? actualComment.id : "",
    isPublished: actualComment ? actualComment.isPublished : "",
    relatedID: actualComment ? actualComment.relatedID : "",
    title: actualComment ? actualComment.title : "",
  };

  const [commentForm, setCommentForm] = useState(defaultForm);
  const { author, email, id, date, title, comment, isPublished, relatedID } =
    commentForm;

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <div className={`${adminPageStyle.wrapper} relative`}>
      <h1 className={adminPageStyle.title}>{text.blogCommentPage.title}</h1>

      <Icon
        icon="bi:trash3-fill"
        className="delete outline-none text-text text-[3rem] hover:text-logopink cursor-pointer absolute top-[1rem] left-[1rem]"
        onClick={() => confirmDelete(actualComment.id)}
      />

      <Icon
        icon={actualComment.isPublished ? "mdi:publish" : "mdi:publish-off"}
        className={`${
          actualComment.isPublished ? "text-green" : "text-red"
        } outline-none text-[4rem] cursor-pointer absolute top-[1rem] right-[1rem]`}
        onClick={() => changePublish(actualComment)}
      />

      <form className="w-full grid grid-cols-4 gap-y-8 gap-x-16">
        <label className={`${blogNewFormStyle.label} col-span-2`}>
          {text.blogCommentPage.id}
          <input
            disabled
            type="text"
            name="id"
            value={id}
            className={blogNewFormStyle.input}
          />
        </label>

        <label className={`${blogNewFormStyle.label} col-span-2`}>
          {text.blogCommentPage.date}
          <input
            disabled
            type="text"
            name="date"
            value={date}
            className={blogNewFormStyle.input}
          />
        </label>

        <label className={`${blogNewFormStyle.label} col-span-2`}>
          {text.blogCommentPage.author}
          <input
            disabled
            type="text"
            name="author"
            value={author}
            className={blogNewFormStyle.input}
          />
        </label>

        <label className={`${blogNewFormStyle.label} col-span-2`}>
          {text.blogCommentPage.email}
          <input
            disabled
            type="text"
            name="email"
            value={email}
            className={blogNewFormStyle.input}
          />
        </label>

        <span className="col-span-2 flex flex-col gap-8">
          <label className={blogNewFormStyle.label}>
            {text.blogCommentPage.commentTitle}
            <input
              disabled
              type="text"
              name="title"
              value={title}
              className={blogNewFormStyle.input}
            />
          </label>

          <label className={blogNewFormStyle.label}>
            {text.blogCommentPage.relatedID}
            <input
              disabled
              type="text"
              name="relatedID"
              value={relatedID}
              className={blogNewFormStyle.input}
            />
          </label>
        </span>

        <label className={`${blogNewFormStyle.label} col-span-2`}>
          {text.blogCommentPage.commentText}
          <textarea
            disabled
            rows={5}
            name="comment"
            value={comment}
            className={blogNewFormStyle.input}
          />
        </label>
      </form>
    </div>
  );
};

export default BlogCommentPage;
