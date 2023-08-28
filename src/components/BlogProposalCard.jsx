import { Link } from "react-router-dom";
import { Theme_Div, Theme_Img, blogProposalStyle } from "../styles";

const BlogProposalCard = ({ post }) => {
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
            {truncate(post.title, 25)}
          </h1>
          <p>{truncate(post.blurb, 55)}</p>
        </div>
      </Theme_Div>
    </Link>
  );
};

export default BlogProposalCard;
