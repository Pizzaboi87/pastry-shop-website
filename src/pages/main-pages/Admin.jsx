import { Outlet } from "react-router-dom";
import { UserContext } from "../../context";
import { AdminLogin, AdminPanel, NoPermission } from "../../components";
import { useContext, useEffect, useState } from "react";

const Admin = () => {
  const { currentUser, isAdmin, setIsAdmin } = useContext(UserContext);
  const [adminVerified, setAdminVerified] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.uid === import.meta.env.VITE_ADMIN_UID) {
      setAdminVerified(true);
    } else {
      setAdminVerified(false);
    }
  }, [currentUser]);

  return (
    <>
      {isAdmin ? (
        <AdminPanel>
          <Outlet />
        </AdminPanel>
      ) : currentUser && adminVerified ? (
        <AdminLogin setIsAdmin={setIsAdmin} />
      ) : (
        <NoPermission />
      )}
    </>
  );
};

export default Admin;
