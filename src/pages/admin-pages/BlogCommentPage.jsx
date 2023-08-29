import { BlogContext, UserContext } from "../../context";
import { Icon } from "@iconify/react";
import { Loading } from "../../components";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeCommentStatus } from "../../utils/firebase";
import { deleteComment } from "../../utils/firebase-admin";
import { useSwalMessage } from "../../utils/useSwalMessage";
import {
  adminPageStyle,
  blogCommentPageStyle,
  blogFormStyle,
} from "../../styles";

const BlogCommentPage = () => {
  const { commentID } = useParams();
  const { text, currentUser } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { allComments, setAllComments, setFirebaseComments } =
    useContext(BlogContext);

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

  const confirmDelete = async (id) => {
    await deleteComment(
      id,
      text,
      currentUser,
      navigate,
      setFirebaseComments,
      setIsDeleting,
      showErrorSwal,
      showSuccessSwal,
      showQuestionSwal
    );
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

  if (isDeleting) return <Loading />;

  return (
    <div className={`${adminPageStyle.wrapper} relative`}>
      <h1 className={adminPageStyle.title}>{text.blogCommentPage.title}</h1>

      <span className={blogCommentPageStyle.span}>
        <Icon
          icon="bi:trash3-fill"
          className={blogCommentPageStyle.deleteIcon}
          onClick={() => confirmDelete(actualComment.id)}
        />

        <Icon
          icon={actualComment.isPublished ? "mdi:publish" : "mdi:publish-off"}
          className={`${
            actualComment.isPublished
              ? blogCommentPageStyle.green
              : blogCommentPageStyle.red
          } ${blogCommentPageStyle.publishIcon}}`}
          onClick={() => changePublish(actualComment)}
        />
      </span>

      <form className={blogCommentPageStyle.form}>
        <label className={blogCommentPageStyle.label}>
          {text.blogCommentPage.id}
          <input
            disabled
            type="text"
            name="id"
            value={id}
            className={blogFormStyle.input}
          />
        </label>

        <label className={blogCommentPageStyle.label}>
          {text.blogCommentPage.date}
          <input
            disabled
            type="text"
            name="date"
            value={date}
            className={blogFormStyle.input}
          />
        </label>

        <label className={blogCommentPageStyle.label}>
          {text.blogCommentPage.author}
          <input
            disabled
            type="text"
            name="author"
            value={author}
            className={blogFormStyle.input}
          />
        </label>

        <label className={blogCommentPageStyle.label}>
          {text.blogCommentPage.email}
          <input
            disabled
            type="text"
            name="email"
            value={email}
            className={blogFormStyle.input}
          />
        </label>

        <span className={blogCommentPageStyle.flex}>
          <label className={blogFormStyle.label}>
            {text.blogCommentPage.commentTitle}
            <input
              disabled
              type="text"
              name="title"
              value={title}
              className={blogFormStyle.input}
            />
          </label>

          <label className={blogFormStyle.label}>
            {text.blogCommentPage.relatedID}
            <input
              disabled
              type="text"
              name="relatedID"
              value={relatedID}
              className={blogFormStyle.input}
            />
          </label>
        </span>

        <label className={blogCommentPageStyle.label}>
          {text.blogCommentPage.commentText}
          <textarea
            disabled
            rows={5}
            name="comment"
            value={comment}
            className={blogFormStyle.input}
          />
        </label>
      </form>
    </div>
  );
};

export default BlogCommentPage;
