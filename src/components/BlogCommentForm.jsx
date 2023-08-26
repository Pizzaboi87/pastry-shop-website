import { useState, useContext } from "react";
import { UserContext } from "../context";
import { storeComment } from "../utils/firebase";
import { errorSwal } from "../utils/swalMessages";
import { v4 as uuidv4 } from "uuid";
import {
  Theme_Button,
  Theme_Input,
  Theme_Textarea,
  blogCommentStyle,
} from "../styles";

const BlogCommentForm = ({ postID }) => {
  const { userData, text } = useContext(UserContext);

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

  const [commentForm, setCommentForm] = useState(defaultForm);
  const { author, email, title, comment } = commentForm;

  const valueCheck = (title, comment) => {
    const commentRegex =
      /(?:[\u{1F000}-\u{1FFFF}]|\p{Emoji_Presentation}|\p{Emoji}\ufe0f|[\p{L}0-9,.\-;:?!()%"@$/€\n\s])/u;

    switch (true) {
      case !commentRegex.test(title):
        errorSwal(text.blogCommentForm.swal.errorCommentTitle);
        return;
      case !commentRegex.test(comment):
        errorSwal(text.blogCommentForm.swal.errorComment);
        return;
      default:
        return true;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCommentForm({ ...commentForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!valueCheck(title, comment)) return;
    else {
      const resp = await storeComment(commentForm);
      if (resp) {
        Swal.fire({
          icon: "success",
          title: text.blogCommentForm.swal.successTitle,
          text: text.blogCommentForm.swal.successMessage,
        });
        setCommentForm(defaultForm);
      } else {
        errorSwal(text.blogCommentForm.swal.errorTitle);
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
        placeholder={text.blogCommentForm.commentPlaceholder}
        rows={5}
        $outlinecolor="logo"
        className={blogCommentStyle.textarea}
      />

      <span className="flex w-full justify-evenly items-end">
        <label className={blogCommentStyle.label}>
          {text.blogCommentForm.name}
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
          {text.blogCommentForm.title}
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
          $textcolor="textlight"
          $bordercolor="transparent"
          $hoverbgcolor="dark"
          $hovertextcolor="textlight"
          className={blogCommentStyle.button}
        >
          {text.blogCommentForm.button}
        </Theme_Button>
      </span>
    </form>
  );
};

export default BlogCommentForm;
