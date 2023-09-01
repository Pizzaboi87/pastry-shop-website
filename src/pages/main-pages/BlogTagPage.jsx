import { BlogContext } from "../../context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Theme_H1, blogTagPageStyle } from "../../styles";
import {
  BlogPostCard,
  BlogStickyCard,
  TransitionParent,
} from "../../components";

const BlogTagPage = () => {
  const { tag } = useParams();
  const { allBlogPost } = useContext(BlogContext);
  const posts = allBlogPost.filter((post) => post.tags.includes(tag));

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={blogTagPageStyle.title}>
        #{tag}
      </Theme_H1>
      <div className={blogTagPageStyle.cardContainer}>
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
