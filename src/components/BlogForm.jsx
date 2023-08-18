import Swal from "sweetalert2";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext, UserContext } from "../context";
import { blogNewFormStyle } from "../styles";
import { uploadPost } from "../utils/firebase-admin";

const BlogForm = ({ dbPost }) => {
  const { text, currentUser } = useContext(UserContext);
  const { setFirebaseData } = useContext(BlogContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let uploadFile = {};
  let newFileName = "";
  let fileExtension = "";

  const normalRegex = /^[A-Za-z0-9-.()\//ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;
  const textRegex = /^[A-Za-z0-9,.\-;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\n\s]+$/;

  const getBackImage = (url) => {
    const start = url.indexOf("%2F") + 3;
    const end = url.indexOf("?alt");
    const extracted = "/blog/" + url.substring(start, end);
    return extracted;
  };

  const defaultForm = {
    author: dbPost ? dbPost.author : "",
    title: dbPost ? dbPost.title : "",
    blurb: dbPost ? dbPost.blurb : "",
    post: dbPost ? dbPost.post : "",
    date: dbPost ? dbPost.date : "",
    postid: dbPost ? dbPost.postid : "",
    image: dbPost ? getBackImage(dbPost.image) : "",
    tags: dbPost ? dbPost.tags : [],
    imageFile: {},
  };

  const [blogForm, setBlogForm] = useState(defaultForm);
  const { author, title, blurb, post, date, postid, tags, image } = blogForm;

  const errorSwal = (error) => {
    Swal.fire({
      icon: "error",
      title: text.blogForm.swal.errorTitle,
      text: error,
    });
  };

  const valueCheck = (author, title, blurb, post, tags) => {
    switch (true) {
      case !normalRegex.test(author):
        errorSwal(text.blogForm.swal.errorName);
        return;
      case !textRegex.test(title):
        errorSwal(text.blogForm.swal.errorPostTitle);
        return;
      case !textRegex.test(blurb):
        errorSwal(text.blogForm.swal.errorBlurb);
        return;
      case !textRegex.test(post):
        errorSwal(text.blogForm.swal.errorPostText);
        return;
      case !normalRegex.test(tags):
        errorSwal(text.blogForm.swal.errorTags);
        return;
      default:
        return true;
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      fileExtension = files[0].name.split(".").pop();
      newFileName = `${postid}.${fileExtension}`;
      uploadFile = new File([files[0]], newFileName);

      const allowedExtensions = ["jpg", "jpeg", "png", "webp", "bmp", "svg"];
      if (!allowedExtensions.some((ext) => fileExtension.includes(ext))) {
        errorSwal(text.blogForm.swal.errorType);
        return;
      }
    }

    if (name === "image") {
      setBlogForm({
        ...blogForm,
        imageFile: uploadFile,
        image: "/blog/" + newFileName,
      });
    } else if (name === "tags") {
      const tagArray = value.split(",");
      setBlogForm({ ...blogForm, tags: tagArray.map((tag) => tag.trim()) });
    } else if (name === "title") {
      const newPostid = value.toLowerCase().split(" ").join("-");
      setBlogForm({
        ...blogForm,
        title: value,
        postid: newPostid,
      });
    } else {
      setBlogForm({ ...blogForm, [name]: value });
    }
    console.log(uploadFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!valueCheck(author, title, blurb, post, tags)) return;

    await uploadPost(
      text,
      currentUser,
      blogForm,
      setIsLoading,
      setFirebaseData,
      navigate
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-4 gap-x-16 gap-y-8"
    >
      <div className="col-span-2 flex flex-col justify-between">
        <label className={blogNewFormStyle.label}>
          {text.blogForm.date}
          <input
            type="date"
            required
            name="date"
            value={date}
            onChange={handleChange}
            className={blogNewFormStyle.input}
          />
        </label>

        <label className={blogNewFormStyle.label}>
          {text.blogForm.title}
          <input
            type="text"
            required
            name="title"
            value={title}
            disabled={image ? true : false}
            title={image ? text.blogForm.titleDisable : null}
            onChange={handleChange}
            className={`${blogNewFormStyle.input} ${
              image ? "cursor-not-allowed" : "cursor-normal"
            }`}
          />
        </label>
        <label className={blogNewFormStyle.label}>
          {text.blogForm.author}
          <input
            type="text"
            required
            name="author"
            value={author}
            onChange={handleChange}
            className={blogNewFormStyle.input}
          />
        </label>
        <label className={blogNewFormStyle.label}>
          {dbPost ? text.blogForm.newImage : text.blogForm.postImage}
          <input
            required={dbPost ? false : true}
            type="file"
            name="image"
            accept="image/*"
            title={text.blogForm.imageDisable}
            disabled={normalRegex.test(title) ? false : true}
            onChange={handleChange}
            className={`${blogNewFormStyle.input} ${
              normalRegex.test(title) ? "cursor-normal" : "cursor-not-allowed"
            }`}
          />
        </label>
        <label className={blogNewFormStyle.label}>
          {text.blogForm.blurb}
          <textarea
            rows={5}
            required
            name="blurb"
            value={blurb}
            onChange={handleChange}
            className={blogNewFormStyle.input}
          />
        </label>
      </div>
      <div className="col-span-2 flex flex-col justify-between gap-y-4">
        <label className={blogNewFormStyle.label}>
          {text.blogForm.post}
          <textarea
            rows={15}
            required
            name="post"
            value={post}
            onChange={handleChange}
            className={blogNewFormStyle.input}
          />
        </label>
        <label className={blogNewFormStyle.label}>
          {text.blogForm.tags}
          <input
            type="text"
            required
            name="tags"
            value={tags}
            onChange={handleChange}
            className={blogNewFormStyle.input}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading ? true : false}
        className={`${blogNewFormStyle.button} ${
          isLoading ? "cursor-progress" : "cursor-pointer"
        } `}
      >
        {isLoading ? text.blogForm.savingButton : text.blogForm.button}
      </button>
    </form>
  );
};

export default BlogForm;
