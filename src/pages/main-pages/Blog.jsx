import { BlogContext, UserContext } from "../../context";
import { useContext } from "react";
import { Theme_H1, blogStyle } from "../../styles";
import {
  BlogCarousel,
  BlogPostCard,
  BlogStickyCard,
  TransitionParent,
} from "../../components";

const Blog = () => {
  const { allBlogPost } = useContext(BlogContext);
  const { text } = useContext(UserContext);

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={blogStyle.title}>
        {text.blogTitle}
      </Theme_H1>

      <div className={blogStyle.carouselContainer}>
        <BlogCarousel posts={allBlogPost} />
      </div>

      <BlogStickyCard posts={allBlogPost} />

      <div className={blogStyle.postContainer}>
        {allBlogPost.map((post) => (
          <BlogPostCard key={post.postid} post={post} isOwnPage={false} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default Blog;
