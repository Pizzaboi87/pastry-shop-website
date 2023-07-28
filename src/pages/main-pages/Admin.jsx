import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context";
import { AdminPanel, Loading, NoPermission } from "../../components";

const Admin = () => {
	const { currentUser } = useContext(UserContext);
	const [adminUID, setAdminUID] = useState(false);

	useEffect(() => {
		if (currentUser && currentUser.uid === import.meta.env.VITE_ADMIN_UID)
			setAdminUID(true);
	}, [currentUser]);

	if (!adminUID) return <Loading />;

	return (
		<>
			{currentUser && adminUID ? (
				<AdminPanel>
					<Outlet />
				</AdminPanel>
			) : (
				<NoPermission />
			)}
		</>
	);
};

export default Admin;
