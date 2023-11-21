import { UserContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { signOutUser } from "../utils/firebase";
import {
  Theme_Li,
  Theme_Div,
  Theme_Icon,
  navMobileStyle,
  personalMenuOffStyle,
  menuOnStyle,
} from "../styles";

const NavUserMobile = ({ openPersonalMenu, setOpenPersonalMenu }) => {
  const { text } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Theme_Div
      $bgcolor="light"
      $bordercolor="transparent"
      className={navMobileStyle.sideMenuContainer}
      style={openPersonalMenu ? menuOnStyle : personalMenuOffStyle}
    >
      <Theme_Icon
        $iconcolor="title"
        icon="solar:close-circle-broken"
        hFlip={true}
        className={navMobileStyle.closeIconRight}
        onClick={() => setOpenPersonalMenu(!openPersonalMenu)}
      />
      <ul className={navMobileStyle.sideMenuList}>
        {text.userAccount.map((link) => (
          <Theme_Li key={link.title} $textcolor="text" $hovertextcolor="logo">
            <Link
              to={link.id}
              onClick={() => setOpenPersonalMenu(!openPersonalMenu)}
            >
              {link.title}
            </Link>
          </Theme_Li>
        ))}
        <Theme_Li
          $textcolor="text"
          $hovertextcolor="logo"
          className={navMobileStyle.userListItem}
        >
          <button
            onClick={() => {
              signOutUser();
              setOpenPersonalMenu(!openPersonalMenu);
              navigate("/");
            }}
            className={navMobileStyle.userButton}
          >
            {text.navbar.signOut}
          </button>
        </Theme_Li>
      </ul>
    </Theme_Div>
  );
};

export default NavUserMobile;
