import NavMobileMenu from "./NavMobileMenu";
import NavUserMobile from "./NavUserMobile";
import { UserContext } from "../context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { Theme_Div, Theme_Icon, navMobileStyle } from "../styles";

const NavMobile = () => {
  const { currentUser } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [openPersonalMenu, setOpenPersonalMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <nav>
      <img
        src={logo}
        alt="logo"
        className={navMobileStyle.logo}
        onClick={() => navigate("/home")}
      />
      <Theme_Div
        $bgcolor="secondary"
        $bordercolor="transparent"
        className={navMobileStyle.menuContainer}
      >
        <Theme_Icon
          $iconcolor="title"
          icon="heroicons-solid:menu-alt-2"
          className={navMobileStyle.menuIcon}
          onClick={() => setOpenMenu(!openMenu)}
        />
        {currentUser && (
          <Theme_Icon
            $iconcolor="title"
            icon="fa6-solid:user-gear"
            className={navMobileStyle.userMenuIcon}
            onClick={() => setOpenPersonalMenu(!openPersonalMenu)}
          />
        )}
      </Theme_Div>

      <NavUserMobile
        openPersonalMenu={openPersonalMenu}
        setOpenPersonalMenu={setOpenPersonalMenu}
      />

      <NavMobileMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </nav>
  );
};

export default NavMobile;
