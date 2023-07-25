import {
  BlogPostCard,
  BlogStickyCard,
  BlogComment,
  TransitionParent,
} from "../components";
import { useParams } from "react-router-dom";
import { dummyPosts } from "../content";

const BlogPostPage = () => {
  const { id } = useParams();
  let post = dummyPosts.filter((post) => post.id === id)[0];

  return (
    <TransitionParent isFlex={false}>
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
        {post.title}
      </h1>

      <div className="xl:col-span-4 col-span-6 ">
        <BlogPostCard key={post.id} post={post} isOwnPage={true} />
      </div>

      <BlogStickyCard posts={dummyPosts} />

      <BlogComment id={id} />
    </TransitionParent>
  );
};

export default BlogPostPage;
