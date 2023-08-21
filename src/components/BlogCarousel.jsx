import ImageCarousel from "./ImageCarousel";
import { Link } from "react-router-dom";

const BlogCarousel = ({ posts }) => {
  const images = posts.map((post, index) => (
    <Link
      to={`/blog/post/` + post.postid}
      className="cursor-pointer"
      key={index}
    >
      <img
        src={post.image}
        alt="image"
        className="w-[20rem] h-[12rem] object-cover border-2 border-white rounded-xl shadow-xl mb-4"
      />
      <p className="text-text text-center text-[1.2rem] font-[600]">
        {post.title}
      </p>
    </Link>
  ));

  return <ImageCarousel>{images}</ImageCarousel>;
};

export default BlogCarousel;
