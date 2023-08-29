import { BlogContext, UserContext } from "../../context";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";
import { Loading } from "../../components";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUser, deleteComment } from "../../utils/firebase-admin";
import { useSwalMessage } from "../../utils/useSwalMessage";
import { useQuery } from "react-query";
import {
  changeCommentStatus,
  getStoredImage,
  getUserImage,
} from "../../utils/firebase";
import {
  adminPageStyle,
  blogCommentsStyle,
  tableStyle,
  tooltipStyle,
} from "../../styles";

const BlogComments = () => {
  const { allComments, setAllComments, setFirebaseComments } =
    useContext(BlogContext);
  const { text, currentUser } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
  const [commentsWithUsers, setCommentsWithUsers] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [isDescending, setIsDescending] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const allUserQuery = async () => {
    const users = await getAllUser(currentUser);
    return users;
  };

  const { data: users, isLoading } = useQuery("userComments", allUserQuery);

  useEffect(() => {
    const fetchCommentUsers = async () => {
      const defaultImg = await getStoredImage("blog/profile.jpg");

      const updatedComments = await Promise.all(
        allComments.map(async (comment) => {
          const user = users.users.find((user) => user.email === comment.email);
          if (user) {
            return {
              ...comment,
              imgsrc: await getUserImage(user.uid),
              userID: user.id,
            };
          } else {
            return { ...comment, imgsrc: defaultImg };
          }
        })
      );

      setCommentsWithUsers(updatedComments);
      setFilteredComments(updatedComments);
    };
    if (users) fetchCommentUsers();
  }, [allComments, users]);

  if (!commentsWithUsers.length) return <Loading />;

  const changePublish = (comment) => {
    changeCommentStatus(comment.id, !comment.isPublished).then(() => {
      const newComments = allComments.map((com) =>
        com.id === comment.id ? { ...com, isPublished: !com.isPublished } : com
      );
      setAllComments(newComments);
    });
  };

  const confirmDelete = async (id) => {
    await deleteComment(
      id,
      text,
      currentUser,
      navigate,
      setFirebaseComments,
      setIsDeleting,
      showErrorSwal,
      showSuccessSwal,
      showQuestionSwal
    );
  };

  if (isDeleting) return <Loading />;

  const sortValues = (id) => {
    let sortedComments;
    switch (id) {
      case "date":
        sortedComments = [...filteredComments].sort((a, b) => a.date - b.date);
        break;
      case "name":
        sortedComments = [...filteredComments].sort((a, b) =>
          a.author.localeCompare(b.author)
        );
        break;
      default:
        sortedComments = [...filteredComments].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
    }

    if (!isDescending) {
      sortedComments.reverse();
    }

    setFilteredComments(sortedComments);
    setIsDescending(!isDescending);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (!value) setFilteredComments(commentsWithUsers);
    const filteredComments = commentsWithUsers.filter((comment) =>
      comment.title.toLowerCase().includes(value.toLowerCase()) ||
      comment.author.toLowerCase().includes(value.toLowerCase())
        ? comment
        : null
    );
    setFilteredComments(filteredComments);
  };

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.blogCommentsTitle}</h1>

      <form>
        <input
          className={blogCommentsStyle.input}
          type="text"
          placeholder={text.blogCommentsSearch}
          onChange={handleChange}
        />
      </form>

      <ul className={blogCommentsStyle.list}>
        {text.commentsHeaders.map((header) => (
          <li
            key={header.id}
            className={`${header.style} ${blogCommentsStyle.header}`}
          >
            {header.title}

            {header.id === "name" ||
            header.id === "title" ||
            header.id === "date" ? (
              <Icon
                icon="solar:round-sort-vertical-broken"
                className={blogCommentsStyle.sortIcon}
                onClick={() => sortValues(header.id)}
              />
            ) : null}
          </li>
        ))}

        {filteredComments.map((comment) => {
          const toDetailsPage = () => {
            if (comment.userID) navigate(`/admin/users/${comment.userID}`);
            else navigate(`/admin/users/deleted-user`);
          };

          return (
            <Fragment key={comment.id}>
              <li
                className={`${tableStyle} ${blogCommentsStyle.imageContainer}`}
              >
                <img
                  src={comment.imgsrc}
                  alt="profile"
                  className={blogCommentsStyle.image}
                  onClick={toDetailsPage}
                />
              </li>
              <li className={blogCommentsStyle.textContainer}>
                <p
                  className={`${tableStyle} ${blogCommentsStyle.author}`}
                  onClick={toDetailsPage}
                >
                  {comment.author}
                </p>
              </li>
              <li
                className={`${tableStyle} ${blogCommentsStyle.textContainer}`}
              >
                <Link
                  to={`/admin/blog/comments/${comment.id}`}
                  className={blogCommentsStyle.hoverText}
                >
                  {comment.title}
                </Link>
              </li>
              <li className={`${tableStyle} ${blogCommentsStyle.mobileHide}`}>
                {new Date(comment.date)
                  .toLocaleString("hu-HU", { timeZone: "Europe/Athens" })
                  .slice(0, -3)}
              </li>

              <li className={blogCommentsStyle.iconContainer}>
                <Icon
                  icon="bi:trash3-fill"
                  className={`${blogCommentsStyle.deleteIcon} ${blogCommentsStyle.hoverText}`}
                  onClick={() => confirmDelete(comment.id)}
                />
                <Link
                  to={`/admin/blog/comments/${comment.id}`}
                  className={`${blogCommentsStyle.editIcon} ${blogCommentsStyle.hoverText}`}
                >
                  <Icon icon="raphael:edit" />
                </Link>
                <Icon
                  icon={comment.isPublished ? "mdi:publish" : "mdi:publish-off"}
                  className={`${
                    comment.isPublished
                      ? blogCommentsStyle.published
                      : blogCommentsStyle.notPublished
                  } ${blogCommentsStyle.publishIcon}`}
                  onClick={() => changePublish(comment)}
                />
              </li>
              <hr className={blogCommentsStyle.hrLine} />
            </Fragment>
          );
        })}
      </ul>
      <Tooltip
        anchorSelect=".published"
        content={text.tooltip.published}
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".hided"
        content={text.tooltip.hided}
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".delete"
        content={text.tooltip.deleteComment}
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".edit"
        content={text.tooltip.viewComment}
        style={tooltipStyle}
        place="top"
      />
    </div>
  );
};

export default BlogComments;
