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

const UsersAll = () => {
  const [allUser, setAllUser] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
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
    await deleteUser(user, currentUser, text, refetch, setIsDeleting);
  };

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.usersAllTitle}</h1>

      <ul className="grid grid-cols-10 w-full items-center">
        {text.usersAllHeaders.map((header) => (
          <li
            key={header.id}
            className={`${header.style} text-text text-[1.1rem] font-[600] pl-2`}
          >
            {header.title}
          </li>
        ))}

        {allUser.map((user, index) => (
          <Fragment key={`${index}-${user.email}`}>
            <li className={`${tableStyle} col-span-1`}>
              <img
                src={user.imgsrc}
                alt="profile"
                className="w-12 h-12 mx-auto object-cover rounded-full cursor-pointer"
                onClick={() => navigate(`/admin/users/${user.id}`)}
              />
            </li>
            <li className={`${tableStyle} col-span-2`}>
              <Link
                to={`/admin/users/${user.id}`}
                className="text-text text-[1rem] hover:text-logopink cursor-pointer"
              >
                {user.displayName}
              </Link>
            </li>
            <li className={`${tableStyle} col-span-3`}>{user.email}</li>
            <li className={`${tableStyle} col-span-2`}>
              {new Date(user.createdAt._seconds * 1000)
                .toLocaleString("hu-HU", { timeZone: "Europe/Athens" })
                .slice(0, -3)}
            </li>
            <li className="flex gap-4 justify-center items-center py-2 col-span-2">
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
