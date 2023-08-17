import Swal from "sweetalert2";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext, UserContext } from "../context";
import { blogNewFormStyle } from "../styles";
import { uploadPost } from "../utils/firebase-admin";
import { getAllPost } from "../utils/firebase";

const BlogForm = ({ dbPost }) => {
  const { text, currentUser } = useContext(UserContext);
  const { setFirebaseData } = useContext(BlogContext);

  const getBackImage = (url) => {
    const start = url.indexOf("%2F") + 3;
    const end = url.indexOf("?alt");
    const extracted = "/blog/" + url.substring(start, end);
    return extracted;
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
  const { author, title, blurb, post, date, image, postid, tags, imageFile } =
    blogForm;

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    let uploadFile = {};

    if (files) {
      const fileExtension = files[0].name.split(".").pop();
      const newFileName = `${postid}.${fileExtension}`;
      uploadFile = new File([files[0]], newFileName);
    }

    if (name === "image") {
      setBlogForm({
        ...blogForm,
        imageFile: uploadFile,
        image: "/blog/" + uploadFile.name,
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
  };

  //------------------------------------------------------NOT READY: Validate missing.------------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
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
            onChange={handleChange}
            className={blogNewFormStyle.input}
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
            onChange={handleChange}
            className={blogNewFormStyle.input}
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
