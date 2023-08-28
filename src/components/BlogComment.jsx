import BlogCommentForm from "./BlogCommentForm";
import { UserContext, BlogContext } from "../context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Theme_Div, blogCommentStyle } from "../styles";

const BlogComment = () => {
  const { id } = useParams();
  const { currentUser, text } = useContext(UserContext);
  const { allComments } = useContext(BlogContext);

  const allRelevantComment = allComments.filter(
    (comment) => comment.relatedID === id && comment.isPublished
  );

  return (
    <div className={blogCommentStyle.wrapper}>
      <Theme_Div
        $bgcolor="primary"
        $bordercolor="transparent"
        className={blogCommentStyle.container}
      >
        <h1 className={blogCommentStyle.title}>{text.blogComment.title}</h1>
        <ul>
          {allRelevantComment.map((comment, index) => (
            <div className={blogCommentStyle.commentWrapper} key={index}>
              <span className={blogCommentStyle.span}>
                <p className={blogCommentStyle.author}>{comment.author}</p>
                <p>
                  {new Date(comment.date)
                    .toLocaleString("hu-HU", { timeZone: "Europe/Athens" })
                    .slice(0, -3)}
                </p>
              </span>
              <p className={blogCommentStyle.commentTitle}>{comment.title}</p>
              <p>{comment.comment}</p>
            </div>
          ))}
        </ul>
      </Theme_Div>
      {currentUser ? (
        <BlogCommentForm postID={id} />
      ) : (
        <div className={blogCommentStyle.loginWrapper}>
          <h1 className={blogCommentStyle.loginTitle}>
            {text.blogComment.login}
          </h1>
        </div>
      )}
    </div>
  );
};

export default BlogComment;
