import { BlogContext, UserContext } from "../../context";
import { BlogForm, Loading } from "../../components";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlogPost } from "../../utils/firebase-admin";
import { useSwalMessage } from "../../utils/useSwalMessage";
import { adminPageStyle } from "../../styles";

const BlogPostEditPage = () => {
  const { allBlogPost, setFirebaseData } = useContext(BlogContext);
  const { text, currentUser, userLanguage } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
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
      text,
      userLanguage,
      showErrorSwal,
      showSuccessSwal,
      showQuestionSwal
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
        className={adminPageStyle.icon}
        onClick={() => confirmDelete(post.postid)}
      />

      <BlogForm dbPost={post} />
    </div>
  );
};

export default BlogPostEditPage;
