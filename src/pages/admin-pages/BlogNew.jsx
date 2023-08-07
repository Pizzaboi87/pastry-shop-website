import { useContext } from "react";
import { BlogForm } from "../../components";
import { adminPageStyle } from "../../styles";
import { LanguageContext } from "../../context";

const BlogNew = () => {
  const { text } = useContext(LanguageContext);

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.blogNewTitle}</h1>
      <BlogForm />
    </div>
  );
};

export default BlogNew;
