import AdminMenu from "./AdminMenu";
import { useContext } from "react";
import { AdminContext } from "../context";
import { text } from "../constants";
import { Theme_H1, titleStyle } from "../styles";

const AdminPanel = ({ children }) => {
  const { setIsAdmin } = useContext(AdminContext);

  return (
    <div className="glass grid grid-cols-6 xl:w-[90%] w-full bg-purpleglass rounded-xl md:p-12 p-4 gap-x-8 shadow-2xl">
      <Theme_H1 $textcolor="title" className={`${titleStyle} col-span-6`}>
        {text.adminPanelTitle}
      </Theme_H1>

      <AdminMenu />

      <div className="col-span-5 bg-white rounded-xl shadow-inner shadow-black p-4">
        {children}
      </div>

      <button
        onClick={() => setIsAdmin(false)}
        className="col-start-6 bg-purple text-white text-[1.2rem] hover:bg-yellowdark hover:text-text font-[500] rounded-xl mt-4 py-2"
      >
        {text.adminSignOut}
      </button>
    </div>
  );
};

export default AdminPanel;
