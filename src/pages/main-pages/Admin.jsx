import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context";
import { AdminPanel, Loading, NoPermission } from "../../components";

const Admin = () => {
	const { currentUser } = useContext(UserContext);
	const [adminUID, setAdminUID] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		if (currentUser && currentUser.uid === import.meta.env.VITE_ADMIN_UID) {
			setTimeout(() => {
				setAdminUID(true);
				setLoading(false);
			}, 500);
		} else {
			setTimeout(() => {
				setAdminUID(false);
				setLoading(false);
			}, 500);
		}
	}, [currentUser]);

	if (loading)
		return (
			<AdminPanel>
				<Loading />
			</AdminPanel>
		);

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
