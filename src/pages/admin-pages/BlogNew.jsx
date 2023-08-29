import { UserContext } from "../../context";
import { BlogForm } from "../../components";
import { useContext } from "react";
import { adminPageStyle } from "../../styles";

const BlogNew = () => {
  const { text } = useContext(UserContext);

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.blogNewTitle}</h1>
      <BlogForm />
    </div>
  );
};

export default BlogNew;
