import { UserContext } from "../../context";
import { UserPanel } from "../../components";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import {
  Theme_Div,
  Theme_H1,
  userPageStyle,
  favouritesStyle,
} from "../../styles";

const Favourites = () => {
  const { text, currentUser } = useContext(UserContext);

  if (!currentUser) return <Navigate to="/auth" />;

  return (
    <Theme_Div
      $bgcolor="glasslight"
      $bordercolor="transparent"
      className={favouritesStyle.container}
    >
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.favouritesTitle}
      </Theme_H1>

      <UserPanel>
        <div className={favouritesStyle.outletContainer}>
          <Outlet />
        </div>
      </UserPanel>
    </Theme_Div>
  );
};

export default Favourites;
