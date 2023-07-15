import { navLinksLeft, navLinksRight } from "../constants";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { LinkButton } from ".";

const Navbar = () => {
  return (
    <nav className="w-[85%] h-[7rem] bg-white fixed pt-4 top-7 rounded-[30px] flex items-center justify-around text-[1.3rem] font-[300] shadow-md z-10">
      <ul className="flex justify-center gap-12">
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

      <span className="flex gap-12 items-center">
        <ul className="flex justify-center gap-12">
          {navLinksRight.map((link) => (
            <li key={link.title} className="text-text hover:text-logopink">
              <Link to={link.id}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <span>
          <Link to="signup" className="text-text hover:text-logopink">
            Register
          </Link>{" "}
          /{" "}
          <LinkButton extraClass="font-[300] px-8 py-1" whereTo="/login">
            Login
          </LinkButton>
        </span>
      </span>
    </nav>
  );
};

export default Navbar;
