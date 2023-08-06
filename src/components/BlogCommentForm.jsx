import Swal from "sweetalert2";
import { useState, useContext } from "react";
import { UserContext } from "../context";
import { otherText } from "../constants";
import { storeComment } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  Theme_Button,
  Theme_Input,
  Theme_Textarea,
  blogCommentStyle,
} from "../styles";

const BlogCommentForm = ({ postID }) => {
  const { userData } = useContext(UserContext);

  const defaultForm = {
    author: userData.displayName ? userData.displayName : "",
    email: userData.email,
    title: "",
    comment: "",
    relatedID: postID,
    date: Date.now(),
    id: uuidv4(),
    isPublished: false,
  };

  const errorSwal = (error) => {
    Swal.fire({
      icon: "error",
      title: otherText.blogCommentForm.swal.errorTitle,
      text: error,
    });
  };

  const [commentForm, setCommentForm] = useState(defaultForm);
  const { author, email, title, comment } = commentForm;

  const valueCheck = (title, comment) => {
    const commentRegex =
      /(?:[\u{1F000}-\u{1FFFF}]|\p{Emoji_Presentation}|\p{Emoji}\ufe0f|[A-Za-z0-9,.\-;:?!()%"@$/€áÁéÉíÍóÓöÖőŐúÚüÜűŰ\n\s])/u;

    switch (true) {
      case !commentRegex.test(title):
        errorSwal(otherText.blogCommentForm.swal.errorCommentTitle);
        return;
      case !commentRegex.test(comment):
        errorSwal(otherText.blogCommentForm.swal.errorComment);
        return;
      default:
        return true;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCommentForm({ ...commentForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!valueCheck(title, comment)) return;
    else {
      try {
        storeComment(commentForm).then(() => {
          Swal.fire({
            icon: "success",
            title: otherText.blogCommentForm.swal.successTitle,
            text: otherText.blogCommentForm.swal.successMessage,
          });
          setCommentForm(defaultForm);
        });
      } catch (error) {
        errorSwal(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-4">
      <Theme_Textarea
        required
        name="comment"
        value={comment}
        onChange={handleChange}
        placeholder={otherText.blogCommentForm.commentPlaceholder}
        rows={5}
        $outlinecolor="logo"
        className={blogCommentStyle.textarea}
      />

      <span className="flex w-full justify-evenly items-end">
        <label className={blogCommentStyle.label}>
          {otherText.blogCommentForm.name}
          <Theme_Input
            required
            disabled={userData.displayName ? true : false}
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
            $outlinecolor="logo"
            className={blogCommentStyle.input}
          />
        </label>

        <label className={blogCommentStyle.label}>
          {otherText.blogCommentForm.title}
          <Theme_Input
            required
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            $outlinecolor="logo"
            className={blogCommentStyle.input}
          />
        </label>

        <Theme_Button
          type="submit"
          $bgcolor="logo"
          $hoverbgcolor="dark"
          $textcolor="textlight"
          className={blogCommentStyle.button}
        >
          {otherText.blogCommentForm.button}
        </Theme_Button>
      </span>
    </form>
  );
};

export default BlogCommentForm;
