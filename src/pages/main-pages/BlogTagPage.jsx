import { useParams } from "react-router-dom";
import { dummyPosts } from "../../content";
import {
  BlogPostCard,
  BlogStickyCard,
  TransitionParent,
} from "../../components";

const BlogTagPage = () => {
  const { tag } = useParams();
  const posts = dummyPosts.filter((post) => post.tags.includes(tag));

  return (
    <TransitionParent isFlex={false}>
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        #{tag}
      </h1>
      <div className="xl:col-span-4 col-span-6 ">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} isOwnPage={false} />
        ))}
      </div>
      <BlogStickyCard posts={dummyPosts} />
    </TransitionParent>
  );
};

export default BlogTagPage;
