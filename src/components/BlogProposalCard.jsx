import { Link } from "react-router-dom";
import { Theme_Div, Theme_Img, blogProposalStyle } from "../styles";
import { useEffect, useState } from "react";

const BlogProposalCard = ({ post }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const truncate = (inputString, length) => {
    if (inputString.length <= length) {
      return inputString;
    } else {
      return inputString.slice(0, length) + "...";
    }
  };

  return (
    <Link to={`/blog/post/` + post.postid}>
      <Theme_Div
        $bgcolor="primary"
        $bordercolor="transparent"
        className={blogProposalStyle.wrapper}
      >
        <Theme_Img
          $bgcolor="logo"
          $bordercolor="textlight"
          src={post.image}
          alt={post.title}
          className={blogProposalStyle.image}
        />
        <div className={blogProposalStyle.container}>
          <h1 className={blogProposalStyle.title}>
            {truncate(
              post.title,
              windowWidth > 350 && windowWidth < 1000 ? 35 : 25
            )}
          </h1>
          <p>
            {truncate(
              post.blurb,
              windowWidth > 350 && windowWidth < 1000 ? 70 : 50
            )}
          </p>
        </div>
      </Theme_Div>
    </Link>
  );
};

export default BlogProposalCard;
