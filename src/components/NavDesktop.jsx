import NavUser from "./NavUser";
import { UserContext } from "../context";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { logo } from "../assets";
import {
  Theme_Button,
  Theme_Li,
  Theme_Link,
  Theme_Nav,
  navDesktopStyle,
} from "../styles";

const NavDesktop = () => {
  const { currentUser, text, setIsReg } = useContext(UserContext);
  const [openMyAccount, setOpenMyAccount] = useState(false);

  return (
    <Theme_Nav $bgcolor="secondary" className={navDesktopStyle.wrapper}>
      <ul className={navDesktopStyle.list}>
        {text.navLinksLeft.map((link) => (
          <Theme_Li key={link.title} $textcolor="text" $hovertextcolor="logo">
            <Link to={link.id} onClick={() => setOpenMyAccount(false)}>
              {link.title}
            </Link>
          </Theme_Li>
        ))}

        <li>
          <img className={navDesktopStyle.logo} src={logo} alt="logo" />
        </li>

        {text.navLinksRight.map((link) => (
          <Theme_Li key={link.title} $textcolor="text" $hovertextcolor="logo">
            <Link to={link.id} onClick={() => setOpenMyAccount(false)}>
              {link.title}
            </Link>
          </Theme_Li>
        ))}

        {!currentUser ? (
          <li>
            <span>
              <Theme_Link
                to="auth"
                $textcolor="text"
                $bgcolor="transparent"
                $hovertextcolor="logo"
                onClick={() => {
                  setIsReg(true);
                  () => setOpenMyAccount(false);
                }}
              >
                {text.navbar.reg}
              </Theme_Link>{" "}
              /{" "}
              <Link to="auth">
                <Theme_Button
                  $bgcolor="logo"
                  $textcolor="textlight"
                  $bordercolor="transparent"
                  $hoverbgcolor="dark"
                  $hovertextcolor="textlight"
                  className={navDesktopStyle.button}
                  onClick={() => {
                    setIsReg(false);
                    () => setOpenMyAccount(false);
                  }}
                >
                  {text.navbar.login}
                </Theme_Button>
              </Link>
            </span>
          </li>
        ) : (
          <>
            <Theme_Li $textcolor="text" $hovertextcolor="logo">
              <Link to="/shop" onClick={() => setOpenMyAccount(false)}>
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
                onClick={() => setOpenMyAccount(!openMyAccount)}
              >
                {text.navbar.profile}
              </Theme_Button>
            </li>
          </>
        )}
      </ul>
      <NavUser
        openMyAccount={openMyAccount}
        setOpenMyAccount={setOpenMyAccount}
      />
    </Theme_Nav>
  );
};

export default NavDesktop;
