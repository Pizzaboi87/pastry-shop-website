import { BlogContext, UserContext } from "../context";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { blogFormStyle, blogFormStyle } from "../styles";
import { uploadPost } from "../utils/firebase-admin";
import { translate } from "../utils/translate";
import { getAllPost, storeImage } from "../utils/firebase";
import { normalizeSync } from "normalize-diacritics";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";

const BlogForm = ({ dbPost }) => {
  const { text, currentUser, userLanguage } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();
  const { setFirebaseData } = useContext(BlogContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  let uploadFile = {};
  let fileExtension = "";
  let newFileName = "";

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
    language: dbPost ? dbPost.language : userLanguage,
    imageFile: {},
  };

  const [blogForm, setBlogForm] = useState(defaultForm);
  const {
    author,
    title,
    blurb,
    post,
    date,
    postid,
    tags,
    image,
    language,
    imageFile,
  } = blogForm;

  const validationRules = {
    author: {
      value: author,
      regex: "normal",
      errorMessage: text.blogForm.swal.errorName,
    },
    title: {
      value: title,
      regex: "text",
      errorMessage: text.blogForm.swal.errorPostTitle,
    },
    blurb: {
      value: blurb,
      regex: "text",
      errorMessage: text.blogForm.swal.errorBlurb,
    },
    post: {
      value: post,
      regex: "text",
      errorMessage: text.blogForm.swal.errorPostText,
    },
    tags: {
      value: tags.toString(),
      regex: "normal",
      errorMessage: text.blogForm.swal.errorTags,
    },
  };

  const { isValid } = useValidation(validationRules);

  const getTranslations = async () => {
    setIsTranslating(true);
    const langCodes = ["eng", "fra", "esp", "hun"];
    const originalCode = language.slice(0, -1);

    const formObjects = {};

    for (const code of langCodes) {
      const translatedForm = { ...blogForm };
      const toCode = code.slice(0, -1);

      if (toCode !== originalCode) {
        translatedForm.title = await translate(title, originalCode, toCode);
        translatedForm.blurb = await translate(blurb, originalCode, toCode);
        translatedForm.post = await translate(post, originalCode, toCode);
        translatedForm.language = code;
      }

      let formName = "";
      switch (toCode) {
        case "fr":
          formName = "fraForm";
          break;
        case "es":
          formName = "espForm";
          break;
        case "hu":
          formName = "hunForm";
          break;
        default:
          formName = "engForm";
          break;
      }

      formObjects[formName] = translatedForm;
    }

    setIsTranslating(false);
    return formObjects;
  };

  const generateCleanTitle = (title) => {
    const cleanedTitle = title
      .toLowerCase()
      .replace(/[^\p{L}0-9\s]/gu, "")
      .split(/\s+/g)
      .map((word) => normalizeSync(word))
      .join("-");

    return cleanedTitle;
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      fileExtension = files[0].name.split(".").pop();
      newFileName = `${postid}.${fileExtension}`;
      uploadFile = new File([files[0]], newFileName);

      const allowedExtensions = ["jpg", "jpeg", "png", "webp", "bmp", "svg"];
      if (!allowedExtensions.some((ext) => fileExtension.includes(ext))) {
        showErrorSwal(text.blogForm.swal.errorType);
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
      const newPostid = generateCleanTitle(value);
      setBlogForm({
        ...blogForm,
        title: value,
        postid: newPostid,
      });
    } else {
      setBlogForm({ ...blogForm, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid()) return;

    await storeImage(imageFile, image);
    const formObjects = await getTranslations();

    const uploadPromises = Promise.all(
      Object.values(formObjects).map(async (translatedForm) => {
        await uploadPost(
          text,
          currentUser,
          translatedForm,
          setIsLoading,
          showErrorSwal,
          showSuccessSwal
        );
      })
    );

    await uploadPromises;

    const data = await getAllPost(userLanguage);
    setFirebaseData(data);

    navigate("/admin/blog/all");
  };

  return (
    <form onSubmit={handleSubmit} className={blogFormStyle.form}>
      <div className={blogFormStyle.container}>
        <label className={blogFormStyle.label}>
          {text.blogForm.languageLabel}
          <select
            required
            value={language}
            name="language"
            onChange={handleChange}
            className={`${blogFormStyle.input} h-[2.2rem]`}
          >
            {text.blogForm.language.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
        </label>

        <label className={blogFormStyle.label}>
          {text.blogForm.date}
          <input
            type="date"
            required
            disabled={dbPost ? true : false}
            name="date"
            value={date}
            onChange={handleChange}
            className={`${blogFormStyle.input} ${
              dbPost ? "cursor-not-allowed" : "cursor-normal"
            }`}
          />
        </label>

        <label className={blogFormStyle.label}>
          {text.blogForm.title}
          <input
            type="text"
            required
            name="title"
            value={title}
            disabled={image || dbPost ? true : false}
            title={dbPost ? null : image ? text.blogForm.titleDisable : null}
            onChange={handleChange}
            className={`${blogFormStyle.input} ${
              image || dbPost ? "cursor-not-allowed" : "cursor-normal"
            }`}
          />
        </label>
        <label className={blogFormStyle.label}>
          {text.blogForm.author}
          <input
            type="text"
            required
            name="author"
            disabled={dbPost ? true : false}
            value={author}
            onChange={handleChange}
            className={`${blogFormStyle.input} ${
              dbPost ? "cursor-not-allowed" : "cursor-normal"
            }`}
          />
        </label>
        <label className={blogFormStyle.label}>
          {dbPost ? text.blogForm.newImage : text.blogForm.postImage}
          <input
            required={dbPost ? false : true}
            type="file"
            name="image"
            accept="image/*"
            title={text.blogForm.imageDisable}
            disabled={normalRegex.test(title) ? false : true}
            onChange={handleChange}
            className={`${blogFormStyle.input} ${
              normalRegex.test(title) ? "cursor-normal" : "cursor-not-allowed"
            }`}
          />
        </label>
        <label className={blogFormStyle.label}>
          {text.blogForm.blurb}
          <textarea
            rows={5}
            required
            name="blurb"
            value={blurb}
            onChange={handleChange}
            className={blogFormStyle.input}
          />
        </label>
      </div>
      <div className={blogFormStyle.container}>
        <label className={blogFormStyle.label}>
          {text.blogForm.post}
          <textarea
            rows={17}
            required
            name="post"
            value={post}
            onChange={handleChange}
            className={blogFormStyle.input}
          />
        </label>
        <label className={blogFormStyle.label}>
          {text.blogForm.tags}
          <input
            type="text"
            required
            name="tags"
            value={tags}
            onChange={handleChange}
            className={blogFormStyle.input}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading ? true : false}
        className={`${blogFormStyle.button} ${
          isLoading ? "cursor-progress" : "cursor-pointer"
        } `}
      >
        {isTranslating
          ? text.blogForm.translateButton
          : isLoading
          ? text.blogForm.savingButton
          : text.blogForm.button}
      </button>
    </form>
  );
};

export default BlogForm;
