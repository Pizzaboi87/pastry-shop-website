import { Fragment, useEffect, useState, useContext } from "react";
import { UserContext } from "../../context";
import { Icon } from "@iconify/react";
import { Loading } from "../../components";
import { adminPageStyle, tableStyle, tooltipStyle } from "../../styles";
import { Tooltip } from "react-tooltip";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getAllUser } from "../../utils/firebase-admin";
import { getStoredImage, getUserImage } from "../../utils/firebase";
import { useQuery } from "react-query";
import { useSwalMessage } from "../../utils/useSwalMessage";

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

      <ul className="grid grid-cols-10 w-full items-center">
        {text.usersAllHeaders.map((header) => (
          <li
            key={header.id}
            className={`${header.style} hidden md:min-h-[2rem] text-text text-[1.1rem] font-[600] pl-2 md:flex items-center gap-x-4`}
          >
            {header.title}

            {header.id === "date" ||
            header.id === "email" ||
            header.id === "name" ? (
              <Icon
                icon="solar:round-sort-vertical-broken"
                className="text-[1.8rem] hover:text-logopink cursor-pointer"
                onClick={() => sortValues(header.id)}
              />
            ) : null}
          </li>
        ))}

        {allUser.map((user, index) => (
          <Fragment key={`${index}-${user.email}`}>
            <li className={`${tableStyle} md:col-span-1 col-span-10`}>
              <img
                src={user.imgsrc}
                alt="profile"
                className="md:w-12 w-16 md:h-12 h-16 mx-auto object-cover rounded-full cursor-pointer"
                onClick={() => navigate(`/admin/users/${user.id}`)}
              />
            </li>
            <li
              className={`${tableStyle} md:col-span-2 col-span-10 md:text-left text-center`}
            >
              <Link
                to={`/admin/users/${user.id}`}
                className="text-text text-[1rem] hover:text-logopink cursor-pointer"
              >
                {user.displayName}
              </Link>
            </li>
            <li
              className={`${tableStyle} md:col-span-3 col-span-10 md:text-left text-center hover:text-logopink cursor-pointer`}
              onClick={() => sendMail(user.email, user.displayName)}
            >
              {user.email}
            </li>
            <li className={`${tableStyle} md:block hidden col-span-2`}>
              {new Date(user.createdAt._seconds * 1000)
                .toLocaleString("hu-HU", { timeZone: "Europe/Athens" })
                .slice(0, -3)}
            </li>
            <li className="md:flex hidden gap-4 justify-center items-center py-2 col-span-2">
              <Icon
                icon="bi:trash3-fill"
                className="delete outline-none text-text text-[2rem] hover:text-logopink cursor-pointer"
                onClick={() => confirmDelete(user)}
              />
              <Link
                to={`/admin/users/${user.id}`}
                className="edit outline-none text-text text-[2rem] hover:text-logopink cursor-pointer"
              >
                <Icon icon="raphael:edit" />
              </Link>
            </li>
            <hr className="h-[0.1rem] md:hidden col-span-10 bg-black mb-4 mt-2" />
          </Fragment>
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
