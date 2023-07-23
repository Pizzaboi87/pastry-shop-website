import { BlogCarousel, BlogPostCard, BlogStickyCard } from "../components";
import { dummyPosts } from "../content";

const Blog = () => {
  return (
    <div className="glass grid grid-cols-6 md:mt-56 mt-36 xl:w-[90%] 3xl:w-[80%] w-full bg-glass rounded-xl md:p-12 p-4 gap-x-12 shadow-2xl">
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
    </div>
  );
};

export default Blog;
