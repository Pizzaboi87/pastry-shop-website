import { Link } from "react-router-dom";
import { Theme_Div, Theme_Img } from "../styles";

const BlogProposalCard = ({ post }) => {
  const truncate = (inputString, length) => {
    if (inputString.length <= length) {
      return inputString;
    } else {
      return inputString.slice(0, length) + "...";
    }
  };

  return (
    <Link to={`/blog/post/` + post.title.toLowerCase().split(" ").join("-")}>
      <Theme_Div
        $bgcolor="primary"
        className="h-fit rounded-xl p-3 grid grid-cols-6 shadow-xl cursor-pointer"
      >
        <Theme_Img
          $bgcolor="logo"
          $bordercolor="textlight"
          src={post.image}
          alt={post.title}
          className="col-span-2 rounded-full w-[5rem] h-[5rem] object-cover border-2"
        />
        <div className="col-span-4 flex flex-col items-center w-full">
          <h1 className="text-text text-[1rem] font-[600] self-start">
            {truncate(post.title, 25)}
          </h1>
          <p>{truncate(post.blurb, 55)}</p>
        </div>
      </Theme_Div>
    </Link>
  );
};

export default BlogProposalCard;
