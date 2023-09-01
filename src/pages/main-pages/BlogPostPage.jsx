import { BlogContext } from "../../context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Theme_H1, blogPostPageStyle } from "../../styles";
import {
  BlogPostCard,
  BlogStickyCard,
  BlogComment,
  TransitionParent,
} from "../../components";

const BlogPostPage = () => {
  const { id } = useParams();
  const { allBlogPost } = useContext(BlogContext);
  const post = allBlogPost.filter((post) => post.postid === id)[0];

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={blogPostPageStyle.title}>
        {post.title}
      </Theme_H1>

      <div className={blogPostPageStyle.cardContainer}>
        <BlogPostCard key={post.id} post={post} isOwnPage={true} />
      </div>

      <BlogStickyCard posts={allBlogPost} />

      <BlogComment />
    </TransitionParent>
  );
};

export default BlogPostPage;
