import { useContext } from "react";
import { BlogContext } from "../../context";
import { otherText } from "../../constants";
import { Theme_H1, titleStyle } from "../../styles";
import {
  BlogCarousel,
  BlogPostCard,
  BlogStickyCard,
  TransitionParent,
} from "../../components";

const Blog = () => {
  const [allBlogPost] = useContext(BlogContext);

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={`${titleStyle} col-span-6`}>
        {otherText.blogTitle}
      </Theme_H1>

      <div className="col-span-6 xl:mb-24 mb-8 -mx-12">
        <BlogCarousel posts={allBlogPost} />
      </div>

      <BlogStickyCard posts={allBlogPost} />

      <div className="xl:col-span-4 col-span-6 ">
        {allBlogPost.map((post) => (
          <BlogPostCard key={post.postid} post={post} isOwnPage={false} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default Blog;
