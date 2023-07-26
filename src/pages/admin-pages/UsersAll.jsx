import { Fragment, useEffect, useState } from "react";
import { getAllUser } from "../../utils/firebase";
import { Icon } from "@iconify/react";
import profImage from "../../assets/rewprof-1.webp";

const UsersAll = () => {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    getAllUser().then((users) => setAllUser(users));
  }, []);

  console.log(allUser);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-text text-[1.5rem] font-[600] mb-8">
        All Registered User
      </h1>

      <ul className="grid grid-cols-8 w-full px-8 items-center">
        <li className="text-text text-[1.2rem] font-[600] bg-yellowlight pl-2 col-span-1">
          Image
        </li>
        <li className="text-text text-[1.2rem] font-[600] bg-yellowdark pl-2 col-span-2">
          Name
        </li>
        <li className="text-text text-[1.2rem] font-[600] bg-yellowlight pl-2 col-span-2">
          Email
        </li>
        <li className="text-text text-[1.2rem] font-[600] bg-yellowdark pl-2 col-span-2">
          Sign-up date
        </li>
        <li className="text-text text-[1.2rem] font-[600] bg-yellowlight pl-2 col-span-1">
          Actions
        </li>

        {allUser.map((user) => (
          <Fragment key={user.uid}>
            <li className="text-text text-[1rem] font-[500] pl-2 py-2 col-span-1">
              <img
                src={profImage}
                alt="profile"
                className="w-8 h-8 mx-auto rounded-full"
              />
            </li>
            <li className="text-text text-[1rem] font-[500] pl-2 py-2 col-span-2">
              {user.displayName}
            </li>
            <li className="text-text text-[1rem] font-[500] pl-2 py-2 col-span-2">
              {user.email}
            </li>
            <li className="text-text text-[1rem] font-[500] pl-2 py-2 col-span-2">
              {new Date(user.createdAt.seconds * 1000)
                .toUTCString()
                .slice(0, -7)}
            </li>
            <li className="flex gap-6 justify-center py-2 col-span-1">
              <Icon
                icon="fluent:delete-16-regular"
                className="text-text text-[1.5rem] hover:text-logopink cursor-pointer"
              />
              <Icon
                icon="vaadin:edit"
                className="text-text text-[1.5rem] hover:text-logopink cursor-pointer"
              />
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default UsersAll;
