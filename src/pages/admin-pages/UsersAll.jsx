import profImage from "../../assets/rewprof-1.webp";
import { Fragment, useEffect, useState } from "react";
import { getAllUser } from "../../utils/firebase";
import { Icon } from "@iconify/react";
import { Loading } from "../../components";
import { otherText, usersAllHeaders } from "../../constants";
import { adminPageStyle, usersAllStyle } from "../../styles";

const UsersAll = () => {
	const [allUser, setAllUser] = useState([]);

	useEffect(() => {
		getAllUser().then((users) => setAllUser(users));
	}, []);

	if (allUser.length === 0) return <Loading />;

	return (
		<div className={adminPageStyle.wrapper}>
			<h1 className={adminPageStyle.title}>{otherText.usersAllTitle}</h1>

			<ul className="grid grid-cols-8 w-full px-8 items-center">
				{usersAllHeaders.map((header) => (
					<li
						key={header.id}
						className={`${header.style} text-text text-[1.2rem] font-[600] pl-2`}
					>
						{header.title}
					</li>
				))}

				{allUser.map((user) => (
					<Fragment key={user.uid}>
						<li className={`${usersAllStyle.text} col-span-1`}>
							<img
								src={profImage}
								alt="profile"
								className="w-8 h-8 mx-auto rounded-full"
							/>
						</li>
						<li className={`${usersAllStyle.text} col-span-2`}>
							{user.displayName}
						</li>
						<li className={`${usersAllStyle.text} col-span-2`}>{user.email}</li>
						<li className={`${usersAllStyle.text} col-span-2`}>
							{new Date(user.createdAt.seconds * 1000)
								.toUTCString()
								.slice(0, -7)}
						</li>
						<li className="flex gap-6 justify-center items-center py-2 col-span-1">
							<Icon
								icon="fluent:delete-16-regular"
								className="text-text text-[2rem] hover:text-logopink cursor-pointer"
							/>
							<Icon
								icon="vaadin:edit"
								className="text-text text-[1.5rem] hover:text-logopink cursor-pointer mt-[0.1rem]"
							/>
						</li>
					</Fragment>
				))}
			</ul>
		</div>
	);
};

export default UsersAll;
