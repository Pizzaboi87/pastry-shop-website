import { BlogContext } from "../../context";
import { useContext, useState, useEffect } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(Math.ceil(window.innerWidth / 160));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={blogPostPageStyle.title}>
        {post.title}
      </Theme_H1>

      <div className={blogPostPageStyle.cardContainer}>
        <BlogPostCard key={post.id} post={post} isOwnPage={true} />
      </div>

      {windowWidth < 1000 ? <BlogComment /> : null}
      <BlogStickyCard posts={allBlogPost} />
      {windowWidth > 1000 ? <BlogComment /> : null}
    </TransitionParent>
  );
};

export default BlogPostPage;
