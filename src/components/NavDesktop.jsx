import NavUser from "./NavUser";
import { UserContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    setOpenMyAccount(false);
    navigate(link);
  };

  return (
    <Theme_Nav $bgcolor="secondary" className={navDesktopStyle.wrapper}>
      <ul className={navDesktopStyle.list}>
        <ul className={navDesktopStyle.listWrapper}>
          {text.navLinksLeft.map((link) => (
            <Theme_Li
              key={link.title}
              $textcolor="text"
              $hovertextcolor="logo"
              className={navDesktopStyle.cursor}
              onClick={() => handleNavigate(link.id)}
            >
              {link.title}
            </Theme_Li>
          ))}
        </ul>

        <li className={navDesktopStyle.logoWrapper}>
          <img className={navDesktopStyle.logo} src={logo} alt="logo" />
        </li>

        {!currentUser ? (
          <ul className={navDesktopStyle.listWrapper}>
            {text.navLinksRight.map((link) => (
              <Theme_Li
                key={link.title}
                $textcolor="text"
                $hovertextcolor="logo"
                className={navDesktopStyle.cursor}
                onClick={() => handleNavigate(link.id)}
              >
                {link.title}
              </Theme_Li>
            ))}
            <li>
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
              </Theme_Link>
            </li>
            <li>
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
            </li>
          </ul>
        ) : (
          <>
            <ul className={navDesktopStyle.listWrapper}>
              {text.navLinksRight.map((link) => (
                <Theme_Li
                  key={link.title}
                  $textcolor="text"
                  $hovertextcolor="logo"
                  className={navDesktopStyle.cursor}
                  onClick={() => handleNavigate(link.id)}
                >
                  {link.title}
                </Theme_Li>
              ))}
              <Theme_Li
                $textcolor="text"
                $hovertextcolor="logo"
                className={navDesktopStyle.cursor}
                onClick={() => handleNavigate("/shop")}
              >
                {text.navbar.shop}
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
            </ul>
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
