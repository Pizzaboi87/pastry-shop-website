import ImageCarousel from "./ImageCarousel";
import { Link } from "react-router-dom";
import { blogCarouselStyle } from "../styles";

const BlogCarousel = ({ posts }) => {
  const images = posts.map((post, index) => (
    <Link
      to={`/blog/post/` + post.postid}
      className="cursor-pointer"
      key={index}
    >
      <img src={post.image} alt="image" className={blogCarouselStyle.image} />
      <p className={blogCarouselStyle.title}>{post.title}</p>
    </Link>
  ));

  return <ImageCarousel>{images}</ImageCarousel>;
};

export default BlogCarousel;
