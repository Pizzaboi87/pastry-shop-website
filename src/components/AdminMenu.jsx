import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context";
import { Icon } from "@iconify/react";

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

  const menuItems = text.adminMenu.map((item) => (
    <span key={item.title}>
      <li className="text-text text-[1.2rem] font-[600]">{item.title}</li>
      <ul className="pl-2 pb-4">
        {item.links.map((link) => (
          <li key={link.title}>
            <Link
              to={link.url}
              className="text-text text-[1rem] font-[500] hover:text-logopink"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </span>
  ));

  return (
    <div
      className={`${
        squeezed ? "h-[5rem]" : "h-fit"
      } pt-4 px-2 md:col-span-1 col-span-6 md:mb-0 mb-4 flex flex-col bg-white rounded-xl items-center md:sticky top-[10rem] shadow-inner shadow-black`}
    >
      <Icon
        icon="icomoon-free:menu2"
        className="md:hidden block text-[3rem] mx-auto cursor-pointer hover:text-logopink"
        onClick={() => setSqueezed(!squeezed)}
      />
      <ul className={`${squeezed ? "squeezed" : "expanded"} md:pt-0 pt-4`}>
        <li className="text-text text-[1.4rem] font-[700] mb-4">
          {text.adminMenuTitle}
        </li>
        {menuItems}
      </ul>
    </div>
  );
};

export default AdminMenu;
