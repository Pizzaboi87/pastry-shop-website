import Swal from "sweetalert2";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommentsContext, UserContext } from "../../context";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";
import { adminPageStyle, tableStyle, tooltipStyle } from "../../styles";
import { Loading } from "../../components";
import {
  changeCommentStatus,
  deleteComment,
  getAllUser,
  getStoredImage,
} from "../../utils/firebase";

const BlogComments = () => {
  const { allComments, setAllComments } = useContext(CommentsContext);
  const { text } = useContext(UserContext);
  const navigate = useNavigate();
  const [commentsWithUsers, setCommentsWithUsers] = useState([]);

  useEffect(() => {
    const fetchCommentUsers = async () => {
      const users = await getAllUser();
      const defaultImg = await getStoredImage("blog/profile.jpg");

      const updatedComments = allComments.map((comment) => {
        const user = users.find((user) => user.email === comment.email);
        if (user) {
          return { ...comment, imgsrc: user.imgsrc, userID: user.id };
        } else {
          return { ...comment, imgsrc: defaultImg };
        }
      });

      setCommentsWithUsers(updatedComments);
    };

    fetchCommentUsers();
  }, [allComments]);

  if (!commentsWithUsers.length) return <Loading />;

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
      title: text.blogCommentPage.swal.question,
      showDenyButton: true,
      confirmButtonText: text.blogCommentPage.swal.confirm,
      denyButtonText: text.blogCommentPage.swal.cancel,
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
              title: text.blogAll.swal.error,
              text: text.blogAll.swal.errorMsg,
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
      <h1 className={adminPageStyle.title}>{text.blogCommentsTitle}</h1>

      <ul className="grid grid-cols-8 w-full px-8 items-center">
        {text.commentsHeaders.map((header) => (
          <li
            key={header.id}
            className={`${header.style} text-text text-[1.1rem] font-[600] pl-2`}
          >
            {header.title}
          </li>
        ))}

        {commentsWithUsers.map((comment) => {
          const toDetailsPage = () => {
            if (comment.userID) navigate(`/admin/users/${comment.userID}`);
            else navigate(`/admin/users/deleted-user`);
          };

          return (
            <Fragment key={comment.id}>
              <li className={`${tableStyle} col-span-1`}>
                <img
                  src={comment.imgsrc}
                  alt="profile"
                  className="w-12 h-12 mx-auto rounded-full object-cover cursor-pointer"
                  onClick={toDetailsPage}
                />
              </li>
              <li className="col-span-2">
                <p
                  className={`${tableStyle} cursor-pointer hover:text-logopink inline`}
                  onClick={toDetailsPage}
                >
                  {comment.author}
                </p>
              </li>
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
          );
        })}
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
        content="View comment."
        style={tooltipStyle}
        place="top"
      />
    </div>
  );
};

export default BlogComments;
