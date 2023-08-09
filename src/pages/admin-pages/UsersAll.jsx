import { Fragment, useEffect, useState, useContext } from "react";
import { getAllUser } from "../../utils/firebase";
import { UserContext } from "../../context";
import { Icon } from "@iconify/react";
import { Loading } from "../../components";
import { adminPageStyle, tableStyle, tooltipStyle } from "../../styles";
import { Tooltip } from "react-tooltip";
import { Link, useNavigate } from "react-router-dom";

const UsersAll = () => {
  const [allUser, setAllUser] = useState([]);
  const { text } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUser().then((users) => setAllUser(users));
  }, []);

  if (allUser.length === 0) return <Loading />;

  return (
    <div className={adminPageStyle.wrapper}>
      <h1 className={adminPageStyle.title}>{text.usersAllTitle}</h1>

      <ul className="grid grid-cols-9 w-full px-8 items-center">
        {text.usersAllHeaders.map((header) => (
          <li
            key={header.id}
            className={`${header.style} text-text text-[1.2rem] font-[600] pl-2`}
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
            <li className={`${tableStyle} col-span-2`}>{user.displayName}</li>
            <li className={`${tableStyle} col-span-3`}>{user.email}</li>
            <li className={`${tableStyle} col-span-2`}>
              {new Date(user.createdAt.seconds * 1000)
                .toLocaleString("hu-HU", { timeZone: "Europe/Athens" })
                .slice(0, -3)}
            </li>
            <li className="flex gap-4 justify-center items-center py-2 col-span-1">
              <Icon
                icon="bi:trash3-fill"
                className="delete outline-none text-text text-[2rem] hover:text-logopink cursor-pointer"
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
        content="Delete user."
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".edit"
        content="View user."
        style={tooltipStyle}
        place="top"
      />
    </div>
  );
};

export default UsersAll;
