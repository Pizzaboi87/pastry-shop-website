import { useState, useContext } from "react";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";
import { UserContext } from "../context";
import { storeComment } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  Theme_Button,
  Theme_Input,
  Theme_Textarea,
  blogCommentStyle,
} from "../styles";

const BlogCommentForm = ({ postID }) => {
  const { userData, text } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();

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

  const validationRules = {
    title: {
      value: title,
      regex: "comment",
      errorMessage: text.blogCommentForm.swal.errorCommentTitle,
    },
    comment: {
      value: comment,
      regex: "comment",
      errorMessage: text.blogCommentForm.swal.errorComment,
    },
  };

  const { isValid } = useValidation(validationRules);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCommentForm({ ...commentForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid()) return;
    else {
      const resp = await storeComment(commentForm);
      if (resp) {
        showSuccessSwal(text.blogCommentForm.swal.successMessage);
        setCommentForm(defaultForm);
      } else {
        showErrorSwal(text.blogCommentForm.swal.errorTitle);
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
