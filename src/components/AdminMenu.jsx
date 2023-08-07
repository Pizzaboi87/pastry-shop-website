import { Link } from "react-router-dom";
import { text } from "../constants";

const AdminMenu = () => {
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
    <div className="p-2 col-span-1 flex flex-col bg-white rounded-xl items-center h-fit sticky top-[10rem] shadow-inner shadow-black">
      <ul>
        <li className="text-text text-[1.4rem] font-[700] mb-4">
          {text.adminMenuTitle}
        </li>
        {menuItems}
      </ul>
    </div>
  );
};

export default AdminMenu;
