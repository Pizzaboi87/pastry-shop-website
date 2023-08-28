import { UserContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { signOutUser } from "../utils/firebase";
import { Theme_Div, Theme_Li, navUserStyle } from "../styles";

const NavUser = ({ openMyAccount, setOpenMyAccount }) => {
  const navigate = useNavigate();
  const { text } = useContext(UserContext);

  return (
    <Theme_Div
      $bgcolor="secondary"
      $bordercolor="transparent"
      className={`${
        openMyAccount ? navUserStyle.closeWrapper : navUserStyle.closeWrapper
      } ${navUserStyle.wrapper}`}
    >
      <ul
        className={`${
          openMyAccount ? navUserStyle.openList : navUserStyle.closeList
        } ${navUserStyle.list}}`}
      >
        {text.userAccount.map((item) => (
          <Theme_Li
            key={item.title}
            $textcolor="text"
            $hovertextcolor="logo"
            className={navUserStyle.listItem}
          >
            <Link to={item.id} onClick={() => setOpenMyAccount(false)}>
              {item.title}
            </Link>
          </Theme_Li>
        ))}
        <Theme_Li
          $textcolor="text"
          $hovertextcolor="logo"
          className={navUserStyle.listItem}
        >
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
