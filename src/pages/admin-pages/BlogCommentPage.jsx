import CommentsWrapper from "../../utils/commentswrapper.hoc";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentsContext } from "../../context";
import { Icon } from "@iconify/react";
import { otherText } from "../../constants";
import { adminPageStyle, blogNewFormStyle } from "../../styles";

const BlogCommentPage = () => {
  const { commentID } = useParams();
  const { allComments } = useContext(CommentsContext);
  const actualComment = allComments.filter(
    (comment) => comment.id === commentID
  )[0];

  const defaultForm = {
    author: actualComment.author,
    email: actualComment.email,
    comment: actualComment.comment,
    date: new Date(actualComment.date).toUTCString(),
    id: actualComment.id,
    isPublished: actualComment.isPublished,
    relatedID: actualComment.relatedID,
    title: actualComment.title,
  };

  const [commentForm, setCommentForm] = useState(defaultForm);
  const { author, email, id, date, title, comment, isPublished, relatedID } =
    commentForm;

  const handleChange = () => {};

  const handleSubmit = () => {};

  const deleteComment = (id) => {
    //Delete comment function need.
    Swal.fire({
      title: otherText.blogCommentPage.swal.question,
      showDenyButton: true,
      confirmButtonText: otherText.blogCommentPage.swal.confirm,
      denyButtonText: otherText.blogCommentPage.swal.cancel,
    });
  };

  return (
    <div className={`${adminPageStyle.wrapper} relative`}>
      <h1 className={adminPageStyle.title}>
        {otherText.blogCommentPage.title}
      </h1>

      <Icon
        icon="bi:trash3-fill"
        className="delete text-text text-[3rem] hover:text-logopink cursor-pointer absolute top-[1rem] left-[1rem]"
        onClick={() => deleteComment(id)}
      />

      <Icon
        icon={isPublished ? "mdi:publish" : "mdi:publish-off"}
        className={`${
          isPublished ? "text-green" : "text-red"
        } outline-none text-[4rem] cursor-pointer absolute top-[1rem] right-[1rem]`}
      />

      <form className="w-full grid grid-cols-4 gap-y-8 gap-x-16">
        <label className={`${blogNewFormStyle.label} col-span-2`}>
          {otherText.blogCommentPage.id}
          <input
            disabled
            type="text"
            name="id"
            value={id}
            className={blogNewFormStyle.input}
          />
        </label>

        <label className={`${blogNewFormStyle.label} col-span-2`}>
          {otherText.blogCommentPage.date}
          <input
            disabled
            type="text"
            name="date"
            value={date}
            className={blogNewFormStyle.input}
          />
        </label>

        <label className={`${blogNewFormStyle.label} col-span-2`}>
          {otherText.blogCommentPage.author}
          <input
            disabled
            type="text"
            name="author"
            value={author}
            className={blogNewFormStyle.input}
          />
        </label>

        <label className={`${blogNewFormStyle.label} col-span-2`}>
          {otherText.blogCommentPage.email}
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
            {otherText.blogCommentPage.commentTitle}
            <input
              disabled
              type="text"
              name="title"
              value={title}
              className={blogNewFormStyle.input}
            />
          </label>

          <label className={blogNewFormStyle.label}>
            {otherText.blogCommentPage.relatedID}
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
          {otherText.blogCommentPage.commentText}
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

export default CommentsWrapper(BlogCommentPage);
