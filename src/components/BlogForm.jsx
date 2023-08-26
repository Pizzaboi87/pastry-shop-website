import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext, UserContext } from "../context";
import { blogNewFormStyle } from "../styles";
import { uploadPost } from "../utils/firebase-admin";
import { translate } from "../utils/translate";
import { getAllPost, storeImage } from "../utils/firebase";
import { normalizeSync } from "normalize-diacritics";
import { useSwalMessage } from "../utils/useSwalMessage";

const BlogForm = ({ dbPost }) => {
  const { text, currentUser, userLanguage } = useContext(UserContext);
  const { showErrorSwal } = useSwalMessage();
  const { setFirebaseData } = useContext(BlogContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const normalRegex = /^[0-9-.,()\//\p{L}\s]+$/u;
  const textRegex = /^[0-9,.\-;:?!()%"@$/€\p{L}0-9\n\s]+$/u;

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

  const valueCheck = (author, title, blurb, post, tags) => {
    switch (true) {
      case !normalRegex.test(author):
        showErrorSwal(text.blogForm.swal.errorName);
        return;
      case !textRegex.test(title):
        showErrorSwal(text.blogForm.swal.errorPostTitle);
        return;
      case !textRegex.test(blurb):
        showErrorSwal(text.blogForm.swal.errorBlurb);
        return;
      case !textRegex.test(post):
        showErrorSwal(text.blogForm.swal.errorPostText);
        return;
      case !normalRegex.test(tags.toString()):
        showErrorSwal(text.blogForm.swal.errorTags);
        return;
      default:
        return true;
    }
  };

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
    if (!valueCheck(author, title, blurb, post, tags)) return;

    await storeImage(imageFile, image);
    const formObjects = await getTranslations();

    const uploadPromises = Promise.all(
      Object.values(formObjects).map(async (translatedForm) => {
        await uploadPost(text, currentUser, translatedForm, setIsLoading);
      })
    );

    await uploadPromises;

    const data = await getAllPost(userLanguage);
    setFirebaseData(data);

    navigate("/admin/blog/all");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-4 md:gap-x-16 gap-y-8"
    >
      <div className="md:col-span-2 col-span-4 flex flex-col gap-y-4 justify-between">
        <label className={blogNewFormStyle.label}>
          {text.blogForm.languageLabel}
          <select
            required
            value={language}
            name="language"
            onChange={handleChange}
            className={`${blogNewFormStyle.input} h-[2.2rem]`}
          >
            {text.blogForm.language.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
        </label>

        <label className={blogNewFormStyle.label}>
          {text.blogForm.date}
          <input
            type="date"
            required
            disabled={dbPost ? true : false}
            name="date"
            value={date}
            onChange={handleChange}
            className={`${blogNewFormStyle.input} ${
              dbPost ? "cursor-not-allowed" : "cursor-normal"
            }`}
          />
        </label>

        <label className={blogNewFormStyle.label}>
          {text.blogForm.title}
          <input
            type="text"
            required
            name="title"
            value={title}
            disabled={image || dbPost ? true : false}
            title={dbPost ? null : image ? text.blogForm.titleDisable : null}
            onChange={handleChange}
            className={`${blogNewFormStyle.input} ${
              image || dbPost ? "cursor-not-allowed" : "cursor-normal"
            }`}
          />
        </label>
        <label className={blogNewFormStyle.label}>
          {text.blogForm.author}
          <input
            type="text"
            required
            name="author"
            disabled={dbPost ? true : false}
            value={author}
            onChange={handleChange}
            className={`${blogNewFormStyle.input} ${
              dbPost ? "cursor-not-allowed" : "cursor-normal"
            }`}
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
      <div className="md:col-span-2 col-span-4 flex flex-col justify-between gap-y-4">
        <label className={blogNewFormStyle.label}>
          {text.blogForm.post}
          <textarea
            rows={17}
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
