import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context";
import { AdminPanel, NoPermission } from "../../components";

const Admin = () => {
  const { currentUser } = useContext(UserContext);
  const [adminUID, setAdminUID] = useState(true);

  useEffect(() => {
    if (currentUser && currentUser.uid === import.meta.env.VITE_ADMIN_UID)
      setAdminUID(true);
    else setAdminUID(false);
  }, [currentUser]);

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
