import {
  BlogCarousel,
  BlogPostCard,
  BlogStickyCard,
  TransitionParent,
} from "../../components";
import { dummyPosts } from "../../content";

const Blog = () => {
  return (
    <TransitionParent isFlex={false}>
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        Our Blog
      </h1>

      <div className="col-span-6 xl:mb-24 mb-8 -mx-12">
        <BlogCarousel posts={dummyPosts} />
      </div>

      <BlogStickyCard posts={dummyPosts} />

      <div className="xl:col-span-4 col-span-6 ">
        {dummyPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} isOwnPage={false} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default Blog;
