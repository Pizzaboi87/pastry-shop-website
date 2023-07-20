import { navLinksLeft, navLinksRight } from "../constants";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { LinkButton } from ".";
import { Icon } from "@iconify/react";
import { useState } from "react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

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
          </ul>
          <span>
            <Link to="auth" className="text-text hover:text-logopink">
              Register
            </Link>{" "}
            /{" "}
            <LinkButton extraClass="font-[300] px-8 py-1" whereto="/auth">
              Login
            </LinkButton>
          </span>
        </span>
      </nav>
      <nav>
        <Icon
          icon="ooui:menu"
          className="lg:invisible visible fixed z-[13] left-8 md:top-24 top-20 md:text-[4rem] text-[3rem] text-brown"
          onClick={() => setOpenMenu(!openMenu)}
        />
        <div
          className={`${
            openMenu ? "menuOn" : "menuOff"
          } bg-pinklight fixed top-0 left-0 z-[12] flex items-center justify-center`}
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
            <Link
              to="auth"
              onClick={() => setOpenMenu(!openMenu)}
              className="text-text hover:text-logopink"
            >
              Register
            </Link>
            <Link
              whereto="/auth"
              onClick={() => setOpenMenu(!openMenu)}
              className="text-text hover:text-logopink"
            >
              Login
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
