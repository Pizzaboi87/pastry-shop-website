import { navLinksLeft, navLinksRight } from "../constants";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState, useContext } from "react";
import { IsRegContext, UserContext } from "../context";
import { menuOffStyle, menuOnStyle } from "../styles";
import { signOutUser } from "../utils/firebase";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isReg, setIsReg] = useContext(IsRegContext);
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <nav className="lg:visible invisible 2xl:w-[85%] w-full h-[7rem] bg-white fixed pt-4 top-7 rounded-2xl flex items-center justify-around text-[1rem] 2xl:text-[1.3rem] font-[300] shadow-md z-10">
        <ul className="flex justify-center 2xl:gap-12 gap-8">
          {navLinksLeft.map((link) => (
            <li key={link.title} className="text-text hover:text-logopink">
              <Link to={link.id}>{link.title}</Link>
            </li>
          ))}
        </ul>

        <img
          className="absolute rounded-full h-[80%] contrast-100"
          src={logo}
          alt="logo"
        />

        <span className="flex 2xl:gap-12 gap-4 items-center">
          <ul className="flex justify-center 2xl:gap-12 gap-8">
            {navLinksRight.map((link) => (
              <li key={link.title} className="text-text hover:text-logopink">
                <Link to={link.id}>{link.title}</Link>
              </li>
            ))}

            {!currentUser ? (
              <li>
                <span>
                  <Link
                    to="auth"
                    className="text-text hover:text-logopink"
                    onClick={() => setIsReg(true)}
                  >
                    Register
                  </Link>{" "}
                  /{" "}
                  <Link
                    to="auth"
                    className="bg-logopink rounded-xl shadow-sm border-none hover:bg-pinkdark text-white text-center font-[300] px-8 py-1"
                    onClick={() => setIsReg(false)}
                  >
                    Login
                  </Link>
                </span>
              </li>
            ) : (
              <>
                <li className="text-text hover:text-logopink">
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <button
                    className="text-text hover:text-logopink"
                    onClick={signOutUser}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </span>
      </nav>
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
          <ul className="flex flex-col md:text-[5rem] text-[2.5rem] font-[500] items-center">
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
