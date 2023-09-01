import AdminMenu from "./AdminMenu";
import { useContext } from "react";
import { UserContext } from "../context";
import { Theme_H1, adminPanelStyle, titleStyle } from "../styles";

const AdminPanel = ({ children }) => {
  const { text, setIsAdmin } = useContext(UserContext);

  return (
    <div className={adminPanelStyle.wrapper}>
      <Theme_H1 $textcolor="title" className={adminPanelStyle.title}>
        {text.adminPanelTitle}
      </Theme_H1>

      <AdminMenu />

      <div className={adminPanelStyle.container}>{children}</div>

      <button
        onClick={() => setIsAdmin(false)}
        className={adminPanelStyle.button}
      >
        {text.adminSignOut}
      </button>
    </div>
  );
};

export default AdminPanel;
