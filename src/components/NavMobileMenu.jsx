import { UserContext } from "../context";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { signOutUser } from "../utils/firebase";
import {
  Theme_Div,
  Theme_Icon,
  Theme_Li,
  Theme_Link,
  Theme_Button,
  menuOffStyle,
  menuOnStyle,
  navMobileStyle,
} from "../styles";

const NavMobileMenu = ({ openMenu, setOpenMenu }) => {
  const { text, currentUser, setIsReg } = useContext(UserContext);

  return (
    <Theme_Div
      $bgcolor="light"
      $bordercolor="transparent"
      className={navMobileStyle.sideMenuContainer}
      style={openMenu ? menuOnStyle : menuOffStyle}
    >
      <Theme_Icon
        $iconcolor="title"
        icon="solar:close-circle-broken"
        className={navMobileStyle.closeIconLeft}
        onClick={() => setOpenMenu(!openMenu)}
      />
      <ul className={navMobileStyle.sideMenuList}>
        {[...text.navLinksLeft, ...text.navLinksRight].map((link) => (
          <Theme_Li key={link.title} $textcolor="text" $hovertextcolor="logo">
            <Link to={link.id} onClick={() => setOpenMenu(!openMenu)}>
              {link.title}
            </Link>
          </Theme_Li>
        ))}
        {!currentUser ? (
          <>
            <Theme_Link
              to="auth"
              $textcolor="text"
              $bgcolor="transparent"
              $hovertextcolor="logo"
              onClick={() => {
                setOpenMenu(!openMenu);
                setIsReg(true);
              }}
            >
              {text.navbar.reg}
            </Theme_Link>
            <Link to="auth">
              <Theme_Button
                $bgcolor="transparent"
                $textcolor="text"
                $bordercolor="transparent"
                $hoverbgcolor="transparent"
                $hovertextcolor="logo"
                onClick={() => {
                  setOpenMenu(!openMenu);
                  setIsReg(false);
                }}
              >
                {text.navbar.login}
              </Theme_Button>
            </Link>
          </>
        ) : (
          <>
            <Theme_Li $textcolor="text" $hovertextcolor="logo">
              <Link to="/shop" onClick={() => setOpenMenu(!openMenu)}>
                {text.navbar.shop}
              </Link>
            </Theme_Li>
            <li>
              <Theme_Button
                $bgcolor="transparent"
                $textcolor="text"
                $bordercolor="transparent"
                $hoverbgcolor="transparent"
                $hovertextcolor="logo"
                onClick={() => {
                  setOpenMenu(!openMenu);
                  signOutUser();
                }}
              >
                {text.navbar.signOut}
              </Theme_Button>
            </li>
          </>
        )}
      </ul>
    </Theme_Div>
  );
};

export default NavMobileMenu;
