import BlogWrapper from "../../utils/blogwrapper.hoc";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../../context";
import {
  BlogPostCard,
  BlogStickyCard,
  TransitionParent,
} from "../../components";

const BlogTagPage = () => {
  const { tag } = useParams();
  const [allBlogPost] = useContext(BlogContext);
  const posts = allBlogPost.filter((post) => post.tags.includes(tag));

  return (
    <TransitionParent isFlex={false}>
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        #{tag}
      </h1>
      <div className="xl:col-span-4 col-span-6 ">
        {posts.map((post, index) => (
          <BlogPostCard
            key={`blogPostCard-{post.id}-${index}`}
            post={post}
            isOwnPage={false}
          />
        ))}
      </div>
      <BlogStickyCard posts={allBlogPost} />
    </TransitionParent>
  );
};

export default BlogWrapper(BlogTagPage);
