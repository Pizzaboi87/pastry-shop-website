import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div className="bg-primary h-fit rounded-xl p-3 grid grid-cols-6 shadow-xl cursor-pointer">
        <img
          src={post.image}
          alt={post.title}
          className="col-span-2 bg-logopink rounded-full w-[5rem] h-[5rem] object-cover border-2 border-white"
        />
        <div className="col-span-4 flex flex-col items-center w-full">
          <h1 className="text-text text-[1rem] font-[600] self-start">
            {truncate(post.title, 25)}
          </h1>
          <p>{truncate(post.blurb, 55)}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogProposalCard;
