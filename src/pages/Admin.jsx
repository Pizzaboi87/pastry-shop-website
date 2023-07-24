import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";

const Admin = () => {
	const { currentUser } = useContext(UserContext);
	const [adminUID, setAdminUID] = useState(false);

	useEffect(() => {
		if (currentUser && currentUser.uid === import.meta.env.VITE_ADMIN_UID)
			setAdminUID(true);
		else setAdminUID(false);
	}, [currentUser]);

	return (
		<div className="glass md:mt-56 mt-36 xl:w-[90%] 3xl:w-[80%] w-full bg-glass rounded-xl md:p-12 p-4 gap-x-12 shadow-2xl">
			{!adminUID ? (
				<h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] text-center">
					You do not have permission to view this page.
				</h1>
			) : (
				<h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
					Admin Panel
				</h1>
			)}
		</div>
	);
};

export default Admin;
