import { useContext } from "react";
import { otherText } from "../constants";
import AdminMenu from "./AdminMenu";
import { AdminContext } from "../context";

const AdminPanel = ({ children }) => {
	const [isAdmin, setIsAdmin] = useContext(AdminContext);

	return (
		<div className="glass grid grid-cols-6 xl:w-[90%] w-full bg-purpleglass rounded-xl md:p-12 p-4 gap-x-8 shadow-2xl">
			<h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center bg-white rounded-xl shadow-inner shadow-black">
				{otherText.adminPanelTitle}
			</h1>

			<AdminMenu />

			<div className="col-span-5 bg-white rounded-xl  shadow-inner shadow-black p-4">
				{children}
			</div>

			<button
				onClick={() => setIsAdmin(false)}
				className="col-start-6 bg-purple text-white text-[1.2rem] hover:bg-yellowdark hover:text-text font-[500] rounded-xl mt-4 py-2"
			>
				Admin Sign Out
			</button>
		</div>
	);
};

export default AdminPanel;
