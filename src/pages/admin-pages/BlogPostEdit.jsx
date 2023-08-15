import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { BlogContext, UserContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import { BlogForm, Loading } from "../../components";
import { adminPageStyle } from "../../styles";
import { Icon } from "@iconify/react";
import { deleteBlogPost } from "../../utils/firebase-admin";

const BlogPostEditPage = () => {
  const { allBlogPost, setAllBlogPost } = useContext(BlogContext);
  const { text, currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const post = allBlogPost.filter((post) => post.postid === id)[0];
  const navigate = useNavigate();

  const confirmDelete = (postid) => {
    Swal.fire({
      title: text.blogAll.swal.question,
      showDenyButton: true,
      confirmButtonText: text.blogAll.swal.confirm,
      denyButtonText: text.blogAll.swal.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        await deleteBlogPost(
          postid,
          setAllBlogPost,
          currentUser,
          text,
          navigate
        );
        setIsLoading(false);
      } else if (result.isDenied) {
        return;
      }
    });
  };

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
