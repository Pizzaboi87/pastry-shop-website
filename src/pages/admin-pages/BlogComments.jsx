import CommentsWrapper from "../../utils/commentswrapper.hoc";
import Swal from "sweetalert2";
import profImage from "../../assets/rewprof-1.webp";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { CommentsContext } from "../../context";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";
import { changeCommentStatus, deleteComment } from "../../utils/firebase";
import { otherText, commentsHeaders } from "../../constants";
import { adminPageStyle, tableStyle, tooltipStyle } from "../../styles";

const BlogComments = () => {
  const { allComments, setAllComments } = useContext(CommentsContext);

  const changePublish = (comment) => {
    changeCommentStatus(comment.id, !comment.isPublished).then(() => {
      const newComments = allComments.map((com) =>
        com.id === comment.id ? { ...com, isPublished: !com.isPublished } : com
      );
      setAllComments(newComments);
    });
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: otherText.blogCommentPage.swal.question,
      showDenyButton: true,
      confirmButtonText: otherText.blogCommentPage.swal.confirm,
      denyButtonText: otherText.blogCommentPage.swal.cancel,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(id)
          .then(() => {
            setAllComments((prevComments) =>
              prevComments.filter((comm) => comm.id !== id)
            );
          })
          .catch((error) => {
            Swal.fire({
              title: otherText.blogAll.swal.error,
              text: otherText.blogAll.swal.errorMsg,
              icon: "error",
            });
            console.error("Error deleting comment:", error);
          });
      } else if (result.isDenied) {
        return;
      }
    });
  };

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{otherText.blogCommentsTitle}</h1>

      <ul className="grid grid-cols-8 w-full px-8 items-center">
        {commentsHeaders.map((header) => (
          <li
            key={header.id}
            className={`${header.style} text-text text-[1.2rem] font-[600] pl-2`}
          >
            {header.title}
          </li>
        ))}

        {allComments.map((comment) => (
          <Fragment key={comment.id}>
            <li className={`${tableStyle} col-span-1`}>
              <img
                src={profImage}
                alt="profile"
                className="w-8 h-8 mx-auto rounded-full"
              />
            </li>
            <li className={`${tableStyle} col-span-2`}>{comment.author}</li>
            <li className={`${tableStyle} col-span-2`}>{comment.title}</li>
            <li className={`${tableStyle} col-span-2`}>
              {new Date(comment.date)
                .toLocaleString("hu-HU", { timeZone: "Europe/Athens" })
                .slice(0, -3)}
            </li>

            <li className="flex gap-4 justify-center items-center py-2 col-span-1">
              <Icon
                icon="bi:trash3-fill"
                className="delete text-text outline-none text-[2rem] hover:text-logopink cursor-pointer"
                onClick={() => confirmDelete(comment.id)}
              />
              <Link
                to={`/admin/blog/comments/${comment.id}`}
                className="edit text-text outline-none text-[1.5rem] hover:text-logopink cursor-pointer"
              >
                <Icon icon="raphael:edit" />
              </Link>
              <Icon
                icon={comment.isPublished ? "mdi:publish" : "mdi:publish-off"}
                className={`${
                  comment.isPublished
                    ? "published text-green"
                    : "hided text-red"
                } outline-none text-[2.5rem] mt-[0.1rem] cursor-pointer`}
                onClick={() => changePublish(comment)}
              />
            </li>
          </Fragment>
        ))}
      </ul>
      <Tooltip
        anchorSelect=".published"
        content="Comment is published now."
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".hided"
        content="Comment is hided now."
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".delete"
        content="Delete comment."
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".edit"
        content="Edit comment."
        style={tooltipStyle}
        place="top"
      />
    </div>
  );
};

export default CommentsWrapper(BlogComments);
