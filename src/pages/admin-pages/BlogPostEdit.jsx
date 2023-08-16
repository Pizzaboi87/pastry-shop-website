import { useContext, useEffect, useState } from "react";
import { BlogContext, UserContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import { BlogForm, Loading } from "../../components";
import { adminPageStyle } from "../../styles";
import { Icon } from "@iconify/react";
import { deleteBlogPost } from "../../utils/firebase-admin";

const BlogPostEditPage = () => {
  const { allBlogPost, setFirebaseData } = useContext(BlogContext);
  const { text, currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(false);
  const { id } = useParams();

  const post = allBlogPost.filter((post) => post.postid === id)[0];
  const navigate = useNavigate();

  const confirmDelete = async (postid) => {
    await deleteBlogPost(
      postid,
      setFirebaseData,
      setIsLoading,
      setResult,
      currentUser,
      text
    );
  };

  useEffect(() => {
    if (result) navigate("/admin/blog/all");
  }, [post, result]);

  if (isLoading) return <Loading />;

  return (
    <div className={`${adminPageStyle.wrapper} relative`}>
      <h1 className={adminPageStyle.title}>{text.blogPostEditTitle}</h1>

      <Icon
        icon="bi:trash3-fill"
        className="text-text text-[3rem] hover:text-yellowdark cursor-pointer absolute top-[1rem] left-[1rem]"
        onClick={() => confirmDelete(post.postid)}
      />

      <BlogForm dbPost={post} />
    </div>
  );
};

export default BlogPostEditPage;
