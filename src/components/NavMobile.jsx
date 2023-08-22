import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../utils/firebase";
import { UserContext } from "../context";
import { logo } from "../assets";
import {
  Theme_Button,
  Theme_Div,
  Theme_Icon,
  Theme_Li,
  Theme_Link,
  menuOffStyle,
  menuOnStyle,
  personalMenuOffStyle,
} from "../styles";

const NavMobile = () => {
  const { currentUser, text, setIsReg } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [openPersonalMenu, setOpenPersonalMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <nav>
      <img
        src={logo}
        alt="logo"
        className="w-[5rem] h-[5rem] mx-auto fixed top-[3rem] left-0 right-0 z-[3]"
        onClick={() => navigate("/home")}
      />
      <Theme_Div
        $bgcolor="secondary"
        $bordercolor="transparent"
        className="lg:invisible visible fixed top-0 left-0 w-full h-[8rem] z-[2] flex justify-between items-end rounded-b-xl shadow-xl"
      >
        <Theme_Icon
          $iconcolor="title"
          icon="heroicons-solid:menu-alt-2"
          className="md:text-[4.2rem] text-[3.4rem] ml-4 mb-2"
          onClick={() => setOpenMenu(!openMenu)}
        />
        {currentUser && (
          <Theme_Icon
            $iconcolor="title"
            icon="fa6-solid:user-gear"
            className="md:text-[3.8rem] text-[2.8rem] mr-4 mb-2"
            onClick={() => setOpenPersonalMenu(!openPersonalMenu)}
          />
        )}
      </Theme_Div>

      <Theme_Div
        $bgcolor="light"
        $bordercolor="transparent"
        className="bg-main bg-mobBackground fixed top-0 left-0 z-[12] flex items-center justify-center"
        style={openPersonalMenu ? menuOnStyle : personalMenuOffStyle}
      >
        <Theme_Icon
          $iconcolor="title"
          icon="solar:close-circle-broken"
          hFlip={true}
          className="absolute top-[2rem] right-[1rem] md:text-[4.8rem] text-[4rem]"
          onClick={() => setOpenPersonalMenu(!openPersonalMenu)}
        />
        <ul className="flex flex-col md:text-[5rem] text-[2.5rem] font-[400] items-center">
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
            className="text-[1.2rem]"
          >
            <button
              onClick={() => {
                signOutUser();
                setOpenPersonalMenu(!openPersonalMenu);
                navigate("/");
              }}
              className="md:text-[5rem] text-[2.5rem] font-[400]"
            >
              {text.navbar.signOut}
            </button>
          </Theme_Li>
        </ul>
      </Theme_Div>

      <Theme_Div
        $bgcolor="light"
        $bordercolor="transparent"
        className="bg-main bg-mobBackground fixed top-0 left-0 z-[12] flex items-center justify-center"
        style={openMenu ? menuOnStyle : menuOffStyle}
      >
        <Theme_Icon
          $iconcolor="title"
          icon="solar:close-circle-broken"
          className="absolute top-[2rem] left-[1rem] md:text-[4.8rem] text-[4rem]"
          onClick={() => setOpenMenu(!openMenu)}
        />
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
