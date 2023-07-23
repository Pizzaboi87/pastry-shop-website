import { useParams } from "react-router-dom";
import { dummyPosts } from "../content";
import { BlogPostCard, BlogStickyCard } from "../components";

const BlogTagPage = () => {
  const { tag } = useParams();
  const posts = dummyPosts.filter((post) => post.tags.includes(tag));

  return (
    <div className="glass grid grid-cols-6 md:mt-56 mt-36 xl:w-[90%] 3xl:w-[80%] w-full bg-glass rounded-xl md:p-12 p-4 gap-x-12 shadow-2xl">
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        #{tag}
      </h1>
      <div className="xl:col-span-4 col-span-6 ">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} isOwnPage={false} />
        ))}
      </div>
      <BlogStickyCard posts={dummyPosts} />
    </div>
  );
};

export default BlogTagPage;
