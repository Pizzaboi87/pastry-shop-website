import { useContext } from "react";
import { Theme_Div, Theme_Li } from "../styles";
import { signOutUser } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "../context";

const NavUser = ({ openMyAccount, setOpenMyAccount }) => {
  const navigate = useNavigate();
  const { text } = useContext(LanguageContext);

  return (
    <Theme_Div
      $bgcolor="secondary"
      className={`${
        openMyAccount ? "h-[15rem]" : "h-0"
      } lg:visible invisible flex flex-col items-center justify-center fixed 3xl:right-[12rem] 2xl:right-[8rem] right-4 top-[8rem] w-[15rem] rounded-b-xl shadow-xl z-[9] transition-all duration-500 ease-in-out`}
    >
      <ul
        className={`${
          openMyAccount ? "visible opacity-1 delay-300" : "invisible opacity-0"
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
  );
};

export default NavUser;
