import BlogWrapper from "../../utils/blogwrapper.hoc";
import Swal from "sweetalert2";
import { useContext } from "react";
import { BlogContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import { BlogForm } from "../../components";
import { otherText } from "../../constants";
import { adminPageStyle } from "../../styles";
import { deletePost } from "../../utils/firebase";
import { Icon } from "@iconify/react";

const BlogPostEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allBlogPost, setAllBlogPost] = useContext(BlogContext);
  const post = allBlogPost.filter((post) => post.postid === id)[0];

  const confirmDelete = (postid) => {
    Swal.fire({
      title: otherText.blogAll.swal.question,
      showDenyButton: true,
      confirmButtonText: otherText.blogAll.swal.confirm,
      denyButtonText: otherText.blogAll.swal.cancel,
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(postid)
          .then(() => {
            setAllBlogPost((prevPosts) =>
              prevPosts.filter((post) => post.postid !== postid)
            );
          })
          .then(() => {
            navigate("/admin/blog/all");
          })
          .catch((error) => {
            Swal.fire({
              title: otherText.blogAll.swal.error,
              text: otherText.blogAll.swal.errorMsg,
              icon: "error",
            });
            console.error("Error deleting post:", error);
          });
      } else if (result.isDenied) {
        return;
      }
    });
  };

  return (
    <div className={`${adminPageStyle.wrapper} relative`}>
      <h1 className={adminPageStyle.title}>{otherText.blogPostEditTitle}</h1>

      <Icon
        icon="bi:trash3-fill"
        className="text-text text-[3rem] hover:text-yellowdark cursor-pointer absolute top-[1rem] left-[1rem]"
        onClick={() => confirmDelete(post.postid)}
      />

      <BlogForm dbPost={post} />
    </div>
  );
};

export default BlogWrapper(BlogPostEditPage);
