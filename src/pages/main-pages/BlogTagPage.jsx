import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../../context";
import { Theme_H1, titleStyle } from "../../styles";
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
      <Theme_H1 $textcolor="title" className={`${titleStyle} col-span-6`}>
        #{tag}
      </Theme_H1>
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

export default BlogTagPage;
