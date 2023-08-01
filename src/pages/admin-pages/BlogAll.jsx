import Swal from "sweetalert2";
import BlogWrapper from "../../utils/blogwrapper.hoc";
import { useContext } from "react";
import { BlogContext } from "../../context";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { otherText } from "../../constants";
import { deletePost } from "../../utils/firebase";
import { adminPageStyle } from "../../styles";

const BlogAll = () => {
  const [allBlogPost, setAllBlogPost] = useContext(BlogContext);

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

  const truncate = (inputString, length = 20) => {
    if (inputString.length <= length) {
      return inputString;
    } else {
      return inputString.slice(0, length) + "...";
    }
  };

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{otherText.blogAll.title}</h1>

      <div className="flex w-full h-full flex-wrap gap-y-8 gap-x-4 justify-evenly">
        {allBlogPost.map((post) => (
          <div
            key={post.postid}
            className="card relative bg-primary overflow-hidden 3xl:w-[15rem] w-[17rem] 3xl:h-[15rem] h-[12rem] flex flex-col items-center cursor-pointer rounded-xl shadow-xl"
          >
            <img
              src={post.image}
              alt="blog"
              className="absolute w-full 3xl:h-[12rem] h-[10rem] object-cover"
            />

            <div className="filter absolute w-full h-full bg-purpleglass">
              <div className="w-full 3xl:h-[12rem] h-[10rem] flex items-center justify-center gap-4">
                <Icon
                  icon="bi:trash3-fill"
                  className="text-white text-[3rem] hover:text-yellowdark cursor-pointer"
                  onClick={() => confirmDelete(post.postid)}
                />
                <Link
                  to={post.postid}
                  className="text-white text-[3rem] hover:text-yellowdark cursor-pointer"
                >
                  <Icon icon="raphael:edit" />
                </Link>
              </div>
              <div className="absolute bottom-0 w-full 3xl:h-[3rem] h-[2rem] bg-yellowdark"></div>
            </div>
            <div className="absolute bottom-0 w-full 3xl:h-[3rem] h-[2rem] flex items-center justify-center">
              <h1 className="text-text text-[1.2rem] font-[500]">
                {truncate(post.title)}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogWrapper(BlogAll);
