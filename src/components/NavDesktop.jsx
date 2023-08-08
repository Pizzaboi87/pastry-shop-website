import NavUser from "./NavUser";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { UserContext, IsRegContext } from "../context";
import { Theme_Button, Theme_Li, Theme_Link, Theme_Nav } from "../styles";

const NavDesktop = () => {
  const { currentUser, text } = useContext(UserContext);
  const [isReg, setIsReg] = useContext(IsRegContext);
  const [openMyAccount, setOpenMyAccount] = useState(false);

  return (
    <Theme_Nav
      $bgcolor="secondary"
      className="lg:visible invisible 2xl:w-[85%] w-full h-[7rem] fixed pt-4 top-7 rounded-2xl flex items-center justify-around text-[1rem] 2xl:text-[1.3rem] font-[400] shadow-md z-10"
    >
      <ul className="flex justify-center items-center 2xl:gap-12 gap-8">
        {text.navLinksLeft.map((link) => (
          <Theme_Li key={link.title} $textcolor="text" $hovertextcolor="logo">
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