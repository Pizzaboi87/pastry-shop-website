import { BlogForm } from "../../components";
import { text } from "../../constants";
import { adminPageStyle } from "../../styles";

const BlogNew = () => {
  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.blogNewTitle}</h1>
      <BlogForm />
    </div>
  );
};

export default BlogNew;
