import BlogCommentForm from "./BlogCommentForm";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext, BlogContext } from "../context";
import { Theme_Div } from "../styles";

const BlogComment = () => {
  const { id } = useParams();
  const { currentUser, text } = useContext(UserContext);
  const { allComments } = useContext(BlogContext);

  const allRelevantComment = allComments.filter(
    (comment) => comment.relatedID === id && comment.isPublished
  );

  return (
    <div className="col-span-4 mb-16">
      <Theme_Div
        $bgcolor="primary"
        $bordercolor="transparent"
        className="w-full rounded-2xl shadow-xl p-6 mb-16"
      >
        <h1 className="text-text text-[1.3rem] font-[600] mb-16">
          {text.blogComment.title}
        </h1>
        <ul>
          {allRelevantComment.map((comment, index) => (
            <div className="flex flex-col my-8" key={index}>
              <span className="w-full flex justify-between">
                <p className="tex-text font-[600]">{comment.author}</p>
                <p>
                  {new Date(comment.date)
                    .toLocaleString("hu-HU", { timeZone: "Europe/Athens" })
                    .slice(0, -3)}
                </p>
              </span>
              <p className="text-text text-[1.2rem] decoration-double underline">
                {comment.title}
              </p>
              <p>{comment.comment}</p>
            </div>
          ))}
        </ul>
      </Theme_Div>
      {currentUser ? (
        <BlogCommentForm postID={id} />
      ) : (
        <div className="w-full text-center">
          <h1 className="text-text text-[1.2rem] font-[600]">
            {text.blogComment.login}
          </h1>
        </div>
      )}
    </div>
  );
};

export default BlogComment;
