import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context";
import {
  Theme_Button,
  Theme_Div,
  Theme_Link,
  blogPostCardStyle,
} from "../styles";

const BlogPostCard = ({ post, isOwnPage }) => {
  const { text } = useContext(UserContext);

  return (
    <Theme_Div
      $bgcolor="primary"
      $bordercolor="transparent"
      className={blogPostCardStyle.wrapper}
    >
      {isOwnPage ? (
        <img src={post.image} alt="image" className={blogPostCardStyle.image} />
      ) : (
        <Link to={`/blog/post/` + post.postid}>
          <img
            src={post.image}
            alt="image"
            className={blogPostCardStyle.image}
          />
        </Link>
      )}

      <div className={blogPostCardStyle.container}>
        {!isOwnPage && (
          <h1 className={blogPostCardStyle.title}>{post.title}</h1>
        )}

        {isOwnPage && (
          <div className={blogPostCardStyle.dateAuthor}>
            <h2>{post.date}</h2>
            <h2>{post.author}</h2>
          </div>
        )}

        <p
          className={`${
            isOwnPage ? blogPostCardStyle.own : blogPostCardStyle.notOwn
          } ${blogPostCardStyle.text}`}
        >
          {post.blurb}
        </p>

        {isOwnPage && (
          <span className={blogPostCardStyle.text}>
            {post.post.split("		").map((paragraph, index) => (
              <p key={index}>
                {paragraph.split("\n").map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </p>
            ))}
          </span>
        )}

        <ul className={blogPostCardStyle.list}>
          {isOwnPage &&
            post.tags.map((tag, index) => (
              <li key={index} className={blogPostCardStyle.listItem}>
                <Theme_Link
                  $textcolor="text"
                  $bgcolor="transparent"
                  $hovertextcolor="logo"
                  to={`/blog/category/${tag}`}
                >
                  #{tag}
                </Theme_Link>
              </li>
            ))}
        </ul>

        <Link
          to={`/blog/post/` + post.postid}
          className={
            isOwnPage ? blogPostCardStyle.hidden : blogPostCardStyle.block
          }
        >
          <Theme_Button
            $bgcolor="logo"
            $textcolor="textlight"
            $bordercolor="transparent"
            $hoverbgcolor="dark"
            $hovertextcolor="textlight"
            className={blogPostCardStyle.button}
          >
            {text.blogPostCardButton}
          </Theme_Button>
        </Link>
      </div>
    </Theme_Div>
  );
};

export default BlogPostCard;
