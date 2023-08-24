import AdminMenu from "./AdminMenu";
import { useContext } from "react";
import { UserContext } from "../context";
import { Theme_H1, titleStyle } from "../styles";

const AdminPanel = ({ children }) => {
  const { text, setIsAdmin } = useContext(UserContext);

  return (
    <div className="glass grid grid-cols-6 xl:w-[90%] w-full bg-purpleglass rounded-xl md:p-12 p-4 gap-x-8 shadow-2xl">
      <Theme_H1 $textcolor="title" className={`${titleStyle} col-span-6`}>
        {text.adminPanelTitle}
      </Theme_H1>

      <AdminMenu />

      <div className="md:col-span-5 col-span-6 bg-white rounded-xl shadow-inner shadow-black p-4">
        {children}
      </div>

      <button
        onClick={() => setIsAdmin(false)}
        className="md:col-start-6 md:col-auto col-span-6 bg-purple text-white text-[1.2rem] hover:bg-yellowdark hover:text-text font-[500] rounded-xl mt-4 py-2"
      >
        {text.adminSignOut}
      </button>
    </div>
  );
};

export default AdminPanel;
