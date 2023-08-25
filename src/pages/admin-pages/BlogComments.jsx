import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlogContext, UserContext } from "../../context";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";
import {
  adminLoginStyle,
  adminPageStyle,
  tableStyle,
  tooltipStyle,
} from "../../styles";
import { Loading } from "../../components";
import { getAllUser, deleteComment } from "../../utils/firebase-admin";
import { useQuery } from "react-query";
import {
  changeCommentStatus,
  getStoredImage,
  getUserImage,
} from "../../utils/firebase";

const BlogComments = () => {
  const { allComments, setAllComments, setFirebaseComments } =
    useContext(BlogContext);
  const { text, currentUser } = useContext(UserContext);
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
      setIsDeleting
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
          className={`${adminLoginStyle.input} border-2 w-[20rem] h-[3rem] mb-4`}
          type="text"
          placeholder={text.blogCommentsSearch}
          onChange={handleChange}
        />
      </form>

      <ul className="grid grid-cols-8 w-full md:px-8 px-4 items-center">
        {text.commentsHeaders.map((header) => (
          <li
            key={header.id}
            className={`${header.style} min-h-[2rem] text-text text-[1.1rem] font-[600] pl-2 hidden md:flex gap-x-4 items-center`}
          >
            {header.title}

            {header.id === "name" ||
            header.id === "title" ||
            header.id === "date" ? (
              <Icon
                icon="solar:round-sort-vertical-broken"
                className="text-[1.8rem] hover:text-logopink cursor-pointer"
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
              <li className={`${tableStyle} md:col-span-1 col-span-8`}>
                <img
                  src={comment.imgsrc}
                  alt="profile"
                  className="md:w-12 w-16 md:h-12 h-16 mx-auto rounded-full object-cover cursor-pointer"
                  onClick={toDetailsPage}
                />
              </li>
              <li className="md:col-span-2 col-span-8 md:text-left text-center">
                <p
                  className={`${tableStyle} cursor-pointer hover:text-logopink inline`}
                  onClick={toDetailsPage}
                >
                  {comment.author}
                </p>
              </li>
              <li
                className={`${tableStyle} md:col-span-2 col-span-8 md:text-left text-center`}
              >
                <Link
                  to={`/admin/blog/comments/${comment.id}`}
                  className="hover:text-logopink cursor-pointer"
                >
                  {comment.title}
                </Link>
              </li>
              <li className={`${tableStyle} hidden md:block col-span-2`}>
                {new Date(comment.date)
                  .toLocaleString("hu-HU", { timeZone: "Europe/Athens" })
                  .slice(0, -3)}
              </li>

              <li className="md:flex hidden gap-4 justify-center items-center py-2 col-span-1">
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
              <hr className="h-[0.1rem] md:hidden col-span-8 bg-black mb-4 mt-2" />
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
