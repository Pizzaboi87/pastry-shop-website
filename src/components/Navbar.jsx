import { useState, useContext } from "react";
import { IsRegContext, UserContext } from "../context";
import { signOutUser } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import {
  Theme_Button,
  Theme_Div,
  Theme_Icon,
  Theme_Li,
  Theme_Link,
  Theme_Nav,
  menuOffStyle,
  menuOnStyle,
} from "../styles";
import { text } from "../constants";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMyAccount, setOpenMyAccount] = useState(false);
  const [isReg, setIsReg] = useContext(IsRegContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      {/* -----------Desktop Nav----------- */}
      <Theme_Nav
        $bgcolor="secondary"
        className="lg:visible invisible 2xl:w-[85%] w-full h-[7rem] fixed pt-4 top-7 rounded-2xl flex items-center justify-around text-[1rem] 2xl:text-[1.3rem] font-[400] shadow-md z-10"
      >
        <ul className="flex justify-center items-center 2xl:gap-12 gap-8">
          {text.navLinksLeft.map((link) => (
            <Theme_Li
              key={link.title}
              $hovertextcolor="logo"
              className="text-text"
            >
              <Link to={link.id} onClick={() => setOpenMyAccount(false)}>
                {link.title}
              </Link>
            </Theme_Li>
          ))}

          <li>
            <img
              className="rounded-full h-[6rem] contrast-100"
              src={logo}
              alt="logo"
            />
          </li>

          {text.navLinksRight.map((link) => (
            <Theme_Li
              key={link.title}
              $hovertextcolor="logo"
              className="text-text"
            >
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
                  $hovertextcolor="logo"
                  className="text-text"
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
                    $hoverbgcolor="dark"
                    $textcolor="textlight"
                    className="rounded-xl shadow-sm border-none text-center font-[400] px-8 py-1"
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
              <Theme_Li $hovertextcolor="logo" className="text-text">
                <Link to="/shop" onClick={() => setOpenMyAccount(false)}>
                  {text.navbar.shop}
                </Link>
              </Theme_Li>
              <li>
                <Theme_Button
                  $hovertextcolor="logo"
                  className="text-text"
                  onClick={() => setOpenMyAccount(!openMyAccount)}
                >
                  {text.navbar.profile}
                </Theme_Button>
              </li>
            </>
          )}
        </ul>
      </Theme_Nav>

      {/* -----------Desktop Profile Submenu----------- */}
      <Theme_Div
        $bgcolor="secondary"
        className={`${
          openMyAccount ? "h-[13rem]" : "h-0"
        } lg:visible invisible fixed 3xl:right-[12rem] 2xl:right-[8rem] right-4 top-[8rem] w-[13rem] rounded-b-xl shadow-xl z-[9]  transition-all duration-500 ease-in-out`}
      >
        <ul
          className={`${
            openMyAccount
              ? "visible opacity-1 delay-300"
              : "invisible opacity-0"
          } flex flex-col p-5 transition-all ease-in-out`}
        >
          {text.userAccount.map((item) => (
            <Theme_Li
              key={item.title}
              $hovertextcolor="logo"
              className="text-text text-[1.2rem]"
            >
              <Link to={item.id} onClick={() => setOpenMyAccount(false)}>
                {item.title}
              </Link>
            </Theme_Li>
          ))}
          <Theme_Li $hovertextcolor="logo" className="text-text text-[1.2rem]">
            <button
              onClick={() => {
                signOutUser();
                setOpenMyAccount(false);
                navigate("/");
              }}
            >
              {text.navbar.signOut}
            </button>
          </Theme_Li>
        </ul>
      </Theme_Div>

      {/* -----------Mobile Nav----------- */}
      <nav>
        <Theme_Icon
          $iconcolor="title"
          icon="ooui:menu"
          className="lg:invisible visible fixed z-[13] left-8 md:top-24 top-20 md:text-[4rem] text-[3rem]"
          onClick={() => setOpenMenu(!openMenu)}
        />
        <Theme_Div
          $bgcolor="light"
          className="bg-main bg-mobBackground fixed top-0 left-0 z-[12] flex items-center justify-center"
          style={openMenu ? menuOnStyle : menuOffStyle}
        >
          <ul className="flex flex-col md:text-[5rem] text-[2.5rem] font-[400] items-center">
            {text.navLinksLeft.map((link) => (
              <Theme_Li
                key={link.title}
                $hovertextcolor="logo"
                className="text-text"
              >
                <Link to={link.id} onClick={() => setOpenMenu(!openMenu)}>
                  {link.title}
                </Link>
              </Theme_Li>
            ))}
            {text.navLinksRight.map((link) => (
              <Theme_Li
                key={link.title}
                $hovertextcolor="logo"
                className="text-text"
              >
                <Link to={link.id} onClick={() => setOpenMenu(!openMenu)}>
                  {link.title}
                </Link>
              </Theme_Li>
            ))}
            {!currentUser ? (
              <>
                <Theme_Link
                  to="auth"
                  $hovertextcolor="logo"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    setIsReg(true);
                  }}
                  className="text-text"
                >
                  {text.navbar.reg}
                </Theme_Link>
                <Link to="auth">
                  <Theme_Button
                    $hoverbgcolor="logo"
                    onClick={() => {
                      setOpenMenu(!openMenu);
                      setIsReg(false);
                    }}
                    className="text-text"
                  >
                    {text.navbar.login}
                  </Theme_Button>
                </Link>
              </>
            ) : (
              <>
                <Theme_Li $hovertextcolor="logo" className="text-text">
                  <Link to="/shop" onClick={() => setOpenMenu(!openMenu)}>
                    {text.navbar.shop}
                  </Link>
                </Theme_Li>
                <li>
                  <Theme_Button
                    $hovertextcolor="logo"
                    className="text-text"
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
    </>
  );
};

export default Navbar;
