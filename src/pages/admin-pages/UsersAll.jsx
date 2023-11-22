import { UserContext } from "../../context";
import { Icon } from "@iconify/react";
import { Loading } from "../../components";
import { Tooltip } from "react-tooltip";
import { Fragment, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getAllUser } from "../../utils/firebase-admin";
import { getStoredImage, getUserImage } from "../../utils/firebase";
import { useSwalMessage } from "../../utils/useSwalMessage";
import { useQuery } from "react-query";
import {
  adminPageStyle,
  tableStyle,
  tooltipStyle,
  usersAllStyle,
} from "../../styles";

const UsersAll = () => {
  const [allUser, setAllUser] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [result, setResult] = useState(false);
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
  const [isDescending, setIsDescending] = useState(true);
  const { text, currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const allUserQuery = async () => {
    const users = await getAllUser(currentUser);
    return users;
  };

  const { data: users, isLoading, refetch } = useQuery("users", allUserQuery);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const updatedUsers = await Promise.all(
          users.users.map(async (user) => {
            let imgsrc;
            if (user && user?.photoExtension) {
              imgsrc = await getUserImage(user.uid);
            } else {
              imgsrc = await getStoredImage("blog/profile.jpg");
            }

            return { ...user, imgsrc };
          })
        );

        setAllUser(updatedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    if (users && !isLoading && !isDeleting) fetchUsers();
  }, [users]);

  if (allUser.length === 0 || isDeleting) return <Loading />;

  const confirmDelete = async (user) => {
    await deleteUser(
      user,
      currentUser,
      text,
      refetch,
      setIsDeleting,
      setResult,
      showErrorSwal,
      showSuccessSwal,
      showQuestionSwal
    );
  };

  const sendMail = (email, adressee) => {
    const subject = text.usersAllEmail.subject;
    const body = `${text.usersAllEmail.bodyStart}${adressee}${text.usersAllEmail.bodyEnd}`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  };

  const sortValues = (id) => {
    let sortedUsers;
    switch (id) {
      case "date":
        sortedUsers = [...allUser].sort(
          (a, b) => a.createdAt._seconds - b.createdAt._seconds
        );
        break;
      case "name":
        sortedUsers = [...allUser].sort((a, b) =>
          a.displayName.localeCompare(b.displayName)
        );
        break;
      default:
        sortedUsers = [...allUser].sort((a, b) =>
          a.email.localeCompare(b.email)
        );
        break;
    }

    if (!isDescending) {
      sortedUsers.reverse();
    }

    setAllUser(sortedUsers);
    setIsDescending(!isDescending);
  };

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.usersAllTitle}</h1>

      <ul className={usersAllStyle.container}>
        {text.usersAllHeaders.map((header) => (
          <li
            key={header.id}
            className={`${header.style} ${usersAllStyle.headerContainer}`}
          >
            {header.title}

            {header.id === "date" ||
            header.id === "email" ||
            header.id === "name" ? (
              <Icon
                icon="solar:round-sort-vertical-broken"
                className={usersAllStyle.sortIcon}
                onClick={() => sortValues(header.id)}
              />
            ) : null}
          </li>
        ))}

        {allUser.map((user, index) => (
          <div
            className={usersAllStyle.userContainer}
            key={`${index}-${user.email}`}
          >
            <li className={usersAllStyle.imageContainer}>
              <img
                src={user.imgsrc}
                alt="profile"
                className={usersAllStyle.image}
                onClick={() => navigate(`/admin/users/${user.id}`)}
              />
            </li>
            <li className={usersAllStyle.nameContainer}>
              <Link
                to={`/admin/users/${user.id}`}
                className={usersAllStyle.name}
              >
                {user.displayName}
              </Link>
            </li>
            <li
              className={usersAllStyle.emailContainer}
              onClick={() => sendMail(user.email, user.displayName)}
            >
              {user.email}
            </li>
            <li className={usersAllStyle.dateContainer}>
              {new Date(user.createdAt._seconds * 1000)
                .toLocaleString("hu-HU", { timeZone: "Europe/Athens" })
                .slice(0, -3)}
            </li>
            <li className={usersAllStyle.iconContainer}>
              <Icon
                icon="bi:trash3-fill"
                className={usersAllStyle.deleteIcon}
                onClick={() => confirmDelete(user)}
              />
              <Link
                to={`/admin/users/${user.id}`}
                className={usersAllStyle.editIcon}
              >
                <Icon icon="raphael:edit" />
              </Link>
            </li>
            <hr className={usersAllStyle.hrLine} />
          </div>
        ))}
      </ul>
      <Tooltip
        anchorSelect=".delete"
        content={text.tooltip.deleteUser}
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".edit"
        content={text.tooltip.viewUser}
        style={tooltipStyle}
        place="top"
      />
    </div>
  );
};

export default UsersAll;
