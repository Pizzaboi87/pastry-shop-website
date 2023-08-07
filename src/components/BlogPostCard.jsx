import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context";
import { Theme_Button, Theme_Div, Theme_Link } from "../styles";

const BlogPostCard = ({ post, isOwnPage }) => {
  const { text } = useContext(LanguageContext);

  const article = post.post.split("		").map((paragraph, index) => (
    <p key={index}>
      {paragraph.split("\n").map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      ))}
    </p>
  ));

  return (
    <Theme_Div
      $bgcolor="primary"
      className="w-full rounded-2xl mb-16 shadow-xl"
    >
      {isOwnPage ? (
        <img
          src={post.image}
          alt="image"
          className="w-full h-[25rem] object-cover rounded-t-2xl"
        />
      ) : (
        <Link to={`/blog/post/` + post.postid}>
          <img
            src={post.image}
            alt="image"
            className="w-full h-[25rem] object-cover rounded-t-2xl"
          />
        </Link>
      )}

      <div className="p-8 flex flex-col items-center justify-center">
        {!isOwnPage && (
          <h1 className="self-center mb-4 text-text text-[1.3rem] font-[600]">
            {post.title}
          </h1>
        )}

        {isOwnPage && (
          <div className="flex w-full justify-between mb-4">
            <h2>{post.date}</h2>
            <h2>{post.author}</h2>
          </div>
        )}

        <p
          className={`${
            isOwnPage ? "font-[600]" : "font-[400]"
          } text-text text-justify text-[1rem] mb-4`}
        >
          {post.blurb}
        </p>

        {isOwnPage && (
          <span className="text-text text-justify text-[1rem] mb-4">
            {article}
          </span>
        )}

        <ul className="flex gap-4 self-start mt-4">
          {isOwnPage &&
            post.tags.map((tag, index) => (
              <li key={index} className="text-[1.2rem]">
                <Theme_Link $hovertextcolor="logo" to={`/blog/category/${tag}`}>
                  #{tag}
                </Theme_Link>
              </li>
            ))}
        </ul>

        <Link
          to={`/blog/post/` + post.postid}
          className={isOwnPage ? "hidden" : "block"}
        >
          <Theme_Button
            $bgcolor="logo"
            $textcolor="textlight"
            className="rounded-xl px-4 py-2 font-[600] shadow-xl self-center"
          >
            {text.blogPostCardButton}
          </Theme_Button>
        </Link>
      </div>
    </Theme_Div>
  );
};

export default BlogPostCard;
