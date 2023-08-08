import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signOutUser } from "../utils/firebase";
import { IsRegContext, UserContext, LanguageContext } from "../context";
import {
  Theme_Button,
  Theme_Div,
  Theme_Icon,
  Theme_Li,
  Theme_Link,
  menuOffStyle,
  menuOnStyle,
} from "../styles";

const NavMobile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [setIsReg] = useContext(IsRegContext);
  const { currentUser } = useContext(UserContext);
  const { text } = useContext(LanguageContext);

  return (
    <nav>
      <Theme_Icon
        $iconcolor="title"
        icon="ooui:menu"
        className="lg:invisible visible fixed z-[13] left-8 md:top-24 top-20 md:text-[4rem] text-[3rem]"
        onClick={() => setOpenMenu(!openMenu)}
      />
      <Theme_Div
        $bgcolor="light"
        $bordercolor="transparent"
        className="bg-main bg-mobBackground fixed top-0 left-0 z-[12] flex items-center justify-center"
        style={openMenu ? menuOnStyle : menuOffStyle}
      >
        <ul className="flex flex-col md:text-[5rem] text-[2.5rem] font-[400] items-center">
          {text.navLinksLeft.map((link) => (
            <Theme_Li key={link.title} $textcolor="text" $hovertextcolor="logo">
              <Link to={link.id} onClick={() => setOpenMenu(!openMenu)}>
                {link.title}
              </Link>
            </Theme_Li>
          ))}
          {text.navLinksRight.map((link) => (
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
                  $hoverbgcolor="logo"
                  $hovertextcolor="text"
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
    </nav>
  );
};

export default NavMobile;
