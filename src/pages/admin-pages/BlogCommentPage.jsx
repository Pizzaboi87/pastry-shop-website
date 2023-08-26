import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogContext, UserContext } from "../../context";
import { Icon } from "@iconify/react";
import { changeCommentStatus } from "../../utils/firebase";
import { adminPageStyle, blogNewFormStyle } from "../../styles";
import { deleteComment } from "../../utils/firebase-admin";
import { Loading } from "../../components";
import { useSwalMessage } from "../../utils/useSwalMessage";

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

      <span className="md:absolute md:mb-0 mb-4 top-0 right-0 w-full flex justify-between items-center md">
        <Icon
          icon="bi:trash3-fill"
          className="delete outline-none text-text text-[3rem] hover:text-logopink cursor-pointer"
          onClick={() => confirmDelete(actualComment.id)}
        />

        <Icon
          icon={actualComment.isPublished ? "mdi:publish" : "mdi:publish-off"}
          className={`${
            actualComment.isPublished ? "text-green" : "text-red"
          } outline-none text-[4rem] cursor-pointer`}
          onClick={() => changePublish(actualComment)}
        />
      </span>

      <form className="w-full grid grid-cols-4 gap-y-8 gap-x-16">
        <label className={`${blogNewFormStyle.label} md:col-span-2 col-span-4`}>
          {text.blogCommentPage.id}
          <input
            disabled
            type="text"
            name="id"
            value={id}
            className={blogNewFormStyle.input}
          />
        </label>

        <label className={`${blogNewFormStyle.label} md:col-span-2 col-span-4`}>
          {text.blogCommentPage.date}
          <input
            disabled
            type="text"
            name="date"
            value={date}
            className={blogNewFormStyle.input}
          />
        </label>

        <label className={`${blogNewFormStyle.label} md:col-span-2 col-span-4`}>
          {text.blogCommentPage.author}
          <input
            disabled
            type="text"
            name="author"
            value={author}
            className={blogNewFormStyle.input}
          />
        </label>

        <label className={`${blogNewFormStyle.label} md:col-span-2 col-span-4`}>
          {text.blogCommentPage.email}
          <input
            disabled
            type="text"
            name="email"
            value={email}
            className={blogNewFormStyle.input}
          />
        </label>

        <span className="md:col-span-2 col-span-4 flex flex-col gap-8">
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

        <label className={`${blogNewFormStyle.label} md:col-span-2 col-span-4`}>
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
