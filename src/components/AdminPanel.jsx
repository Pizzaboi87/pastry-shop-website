import { otherText } from "../constants";
import AdminMenu from "./AdminMenu";

const AdminPanel = ({ children }) => {
	return (
		<div className="glass grid grid-cols-6 xl:w-[90%] w-full bg-purpleglass rounded-xl md:p-12 p-4 gap-x-8 shadow-2xl">
			<h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center bg-white rounded-xl shadow-inner shadow-black">
				{otherText.adminPanelTitle}
			</h1>

			<AdminMenu />

			<div className="col-span-5 bg-white rounded-xl  shadow-inner shadow-black p-4">
				{children}
			</div>
		</div>
	);
};

export default AdminPanel;
