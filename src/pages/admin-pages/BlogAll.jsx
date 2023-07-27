import { useContext } from "react";
import { BlogContext } from "../../context";
import BlogWrapper from "../../utils/blogwrapper.hoc";

const BlogAll = () => {
  const [allBlogPost] = useContext(BlogContext);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-text text-[1.5rem] font-[600] mb-8">
        All Blog Post Admin Page
      </h1>

      <div className="flex w-full h-full flex-wrap gap-4 p-4">
        {allBlogPost.map((post) => (
          <div
            key={post.postid}
            className="w-[11.5rem] h-[10rem] flex flex-col items-center"
          >
            <img
              src={post.image}
              alt="blog"
              className="w-full object-contain"
            />
            <h1 className="text-text text-[1.2rem] font-[500] mb-8">
              {post.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogWrapper(BlogAll);
