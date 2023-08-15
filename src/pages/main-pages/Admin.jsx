import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context";
import { AdminLogin, AdminPanel, NoPermission } from "../../components";

const Admin = () => {
  const { currentUser, isAdmin, setIsAdmin } = useContext(UserContext);
  const [adminUID, setAdminUID] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.uid === import.meta.env.VITE_ADMIN_UID) {
      setAdminUID(true);
    } else {
      setAdminUID(false);
    }
  }, [currentUser]);

  return (
    <>
      {isAdmin ? (
        <AdminPanel>
          <Outlet />
        </AdminPanel>
      ) : currentUser && adminUID ? (
        <AdminLogin setIsAdmin={setIsAdmin} />
      ) : (
        <NoPermission />
      )}
    </>
  );
};

export default Admin;
