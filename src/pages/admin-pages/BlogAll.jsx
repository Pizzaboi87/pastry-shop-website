import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { BlogContext, UserContext } from "../../context";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { adminPageStyle } from "../../styles";
import { deleteBlogPost } from "../../utils/firebase-admin";
import { Loading } from "../../components";

const BlogAll = () => {
  const { allBlogPost, setAllBlogPost } = useContext(BlogContext);
  const { text, currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPosts(allBlogPost);
  }, [allBlogPost]);

  const confirmDelete = (postid) => {
    Swal.fire({
      title: text.blogAll.swal.question,
      showDenyButton: true,
      confirmButtonText: text.blogAll.swal.confirm,
      denyButtonText: text.blogAll.swal.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        await deleteBlogPost(postid, setAllBlogPost, currentUser, text);
        setIsLoading(false);
      } else if (result.isDenied) {
        return;
      }
    });
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

      <div className="flex w-full h-full flex-wrap gap-y-8 gap-x-4 justify-evenly">
        {posts.map((post) => (
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

export default BlogAll;
