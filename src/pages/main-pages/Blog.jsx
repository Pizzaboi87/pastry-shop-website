import { useContext } from "react";
import { BlogContext } from "../../context";
import {
  BlogCarousel,
  BlogPostCard,
  BlogStickyCard,
  TransitionParent,
} from "../../components";

const Blog = () => {
  const [allBlogPost, setAllBlogPost] = useContext(BlogContext);

  return (
    <TransitionParent isFlex={false}>
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        Our Blog
      </h1>

      <div className="col-span-6 xl:mb-24 mb-8 -mx-12">
        <BlogCarousel posts={allBlogPost} />
      </div>

      <BlogStickyCard posts={allBlogPost} />

      <div className="xl:col-span-4 col-span-6 ">
        {allBlogPost.map((post) => (
          <BlogPostCard key={post.postid} post={post} isOwnPage={false} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default Blog;
