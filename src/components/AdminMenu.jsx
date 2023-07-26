import { Link } from "react-router-dom";
import { adminMenu } from "../constants";

const AdminMenu = () => {
  const menuItems = adminMenu.map((item) => (
    <span key={item.title}>
      <li className="text-text text-[1.2rem] font-[600]">{item.title}</li>
      <ul className="pl-2 pb-4">
        {item.links.map((link) => (
          <li
            key={link.title}
            className="text-text text-[1rem] font-[500] hover:text-logopink"
          >
            <Link to={link.url}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </span>
  ));

  return (
    <div className="col-span-1 flex flex-col bg-white rounded-xl items-center h-fit sticky top-[10rem] shadow-inner shadow-black">
      <ul>
        <li className="text-text text-[1.4rem] font-[700] mb-4">Main Menu</li>
        {menuItems}
      </ul>
    </div>
  );
};

export default AdminMenu;
