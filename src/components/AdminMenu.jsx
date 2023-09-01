import { UserContext } from "../context";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { adminMenuStyle } from "../styles";

const AdminMenu = () => {
  const { text } = useContext(UserContext);
  const [squeezed, setSqueezed] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 768) setSqueezed(false);

    const handleResize = () => {
      if (window.innerWidth > 768) setSqueezed(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${
        squeezed ? adminMenuStyle.squeezed : adminMenuStyle.notSqueezed
      } ${adminMenuStyle.wrapper}`}
    >
      <Icon
        icon="icomoon-free:menu2"
        className={adminMenuStyle.icon}
        onClick={() => setSqueezed(!squeezed)}
      />
      <ul
        className={`${squeezed ? "squeezed" : "expanded"} ${
          adminMenuStyle.mainList
        }`}
      >
        <li className={adminMenuStyle.subListItem}>{text.adminMenuTitle}</li>
        {text.adminMenu.map((item) => (
          <span key={item.title}>
            <li className={adminMenuStyle.mainListItem}>{item.title}</li>
            <ul className={adminMenuStyle.subList}>
              {item.links.map((link) => (
                <li key={link.title}>
                  <Link to={link.url} className={adminMenuStyle.title}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </span>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenu;
