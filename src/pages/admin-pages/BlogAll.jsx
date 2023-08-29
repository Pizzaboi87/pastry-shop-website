import { BlogContext, UserContext } from "../../context";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Loading } from "../../components";
import { useContext, useEffect, useState } from "react";
import { adminPageStyle, blogAllStyle } from "../../styles";
import { deleteBlogPost } from "../../utils/firebase-admin";
import { useSwalMessage } from "../../utils/useSwalMessage";

const BlogAll = () => {
  const { allBlogPost, setFirebaseData } = useContext(BlogContext);
  const { text, currentUser, userLanguage } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPosts(allBlogPost);
  }, [allBlogPost, result]);

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

  if (isLoading) return <Loading />;

  const truncate = (inputString, length = 20) => {
    if (inputString.length <= length) {
      return inputString;
    } else {
      return inputString.slice(0, length) + "...";
    }
  };

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.blogAll.title}</h1>

      <div className={blogAllStyle.container}>
        {posts.map((post) => (
          <div key={post.postid} className={blogAllStyle.postContainer}>
            <img src={post.image} alt="blog" className={blogAllStyle.image} />

            <div className={blogAllStyle.filter}>
              <div className={blogAllStyle.content}>
                <Icon
                  icon="bi:trash3-fill"
                  className={blogAllStyle.icon}
                  onClick={() => confirmDelete(post.postid)}
                />
                <Link to={post.postid} className={blogAllStyle.icon}>
                  <Icon icon="raphael:edit" />
                </Link>
              </div>
              <div
                className={`${blogAllStyle.titleContainer} ${blogAllStyle.bg}`}
              ></div>
            </div>
            <div
              className={`${blogAllStyle.titleContainer} ${blogAllStyle.flex}`}
            >
              <h1 className={blogAllStyle.title}>{truncate(post.title)}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogAll;
