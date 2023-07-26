import { useState, useContext } from "react";
import { IsRegContext, UserContext } from "../context";
import { signOutUser } from "../utils/firebase";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { Icon } from "@iconify/react";
import { menuOffStyle, menuOnStyle } from "../styles";
import { myAccount, navLinksLeft, navLinksRight } from "../constants";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMyAccount, setOpenMyAccount] = useState(false);
  const [isReg, setIsReg] = useContext(IsRegContext);
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {/* -----------Desktop Nav----------- */}
      <nav className="lg:visible invisible 2xl:w-[85%] w-full h-[7rem] bg-white fixed pt-4 top-7 rounded-2xl flex items-center justify-around text-[1rem] 2xl:text-[1.3rem] font-[400] shadow-md z-10">
        <ul className="flex justify-center items-center 2xl:gap-12 gap-8">
          {navLinksLeft.map((link) => (
            <li key={link.title} className="text-text hover:text-logopink">
              <Link to={link.id} onClick={() => setOpenMyAccount(false)}>
                {link.title}
              </Link>
            </li>
          ))}

          <li>
            <img
              className="rounded-full h-[6rem] contrast-100"
              src={logo}
              alt="logo"
            />
          </li>

          {navLinksRight.map((link) => (
            <li key={link.title} className="text-text hover:text-logopink">
              <Link to={link.id} onClick={() => setOpenMyAccount(false)}>
                {link.title}
              </Link>
            </li>
          ))}

          {!currentUser ? (
            <li>
              <span>
                <Link
                  to="auth"
                  className="text-text hover:text-logopink"
                  onClick={() => {
                    setIsReg(true);
                    () => setOpenMyAccount(false);
                  }}
                >
                  Register
                </Link>{" "}
                /{" "}
                <Link
                  to="auth"
                  className="bg-logopink rounded-xl shadow-sm border-none hover:bg-pinkdark text-white text-center font-[400] px-8 py-1"
                  onClick={() => {
                    setIsReg(false);
                    () => setOpenMyAccount(false);
                  }}
                >
                  Login
                </Link>
              </span>
            </li>
          ) : (
            <>
              <li className="text-text hover:text-logopink">
                <Link to="/shop" onClick={() => setOpenMyAccount(false)}>
                  Shop
                </Link>
              </li>
              <li>
                <button
                  className="text-text hover:text-logopink"
                  onClick={() => setOpenMyAccount(!openMyAccount)}
                >
                  Profile
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div
        className={`${
          openMyAccount ? "h-[13rem]" : "h-0"
        } lg:visible invisible fixed 2xl:right-[8rem] right-4 top-[8rem] bg-white w-[13rem] rounded-b-xl shadow-xl z-[9]  transition-all duration-500 ease-in-out`}
      >
        <ul
          className={`${
            openMyAccount ? "opacity-1 delay-300" : "opacity-0"
          } flex flex-col p-5 transition-all ease-in-out`}
        >
          {myAccount.map((item) => (
            <li
              key={item.title}
              className="text-text text-[1.2rem] hover:text-logopink"
            >
              <Link to={item.id} onClick={() => setOpenMyAccount(false)}>
                {item.title}
              </Link>
            </li>
          ))}
          <li className="text-text text-[1.2rem] hover:text-logopink">
            <button
              onClick={() => {
                signOutUser();
                () => setOpenMyAccount(false);
              }}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>

      {/* -----------Mobile Nav----------- */}
      <nav>
        <Icon
          icon="ooui:menu"
          className="lg:invisible visible fixed z-[13] left-8 md:top-24 top-20 md:text-[4rem] text-[3rem] text-brown"
          onClick={() => setOpenMenu(!openMenu)}
        />
        <div
          className="bg-pinklight bg-main bg-mobBackground fixed top-0 left-0 z-[12] flex items-center justify-center"
          style={openMenu ? menuOnStyle : menuOffStyle}
        >
          <ul className="flex flex-col md:text-[5rem] text-[2.5rem] font-[400] items-center">
            {navLinksLeft.map((link) => (
              <li key={link.title} className="text-text hover:text-logopink">
                <Link to={link.id} onClick={() => setOpenMenu(!openMenu)}>
                  {link.title}
                </Link>
              </li>
            ))}
            {navLinksRight.map((link) => (
              <li key={link.title} className="text-text hover:text-logopink">
                <Link to={link.id} onClick={() => setOpenMenu(!openMenu)}>
                  {link.title}
                </Link>
              </li>
            ))}
            {!currentUser ? (
              <>
                <Link
                  to="auth"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    setIsReg(true);
                  }}
                  className="text-text hover:text-logopink"
                >
                  Register
                </Link>
                <Link
                  to="auth"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    setIsReg(false);
                  }}
                  className="text-text hover:text-logopink"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <li className="text-text hover:text-logopink">
                  <Link to="/shop" onClick={() => setOpenMenu(!openMenu)}>
                    Shop
                  </Link>
                </li>
                <li>
                  <button
                    className="text-text hover:text-logopink"
                    onClick={() => {
                      setOpenMenu(!openMenu);
                      signOutUser();
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
