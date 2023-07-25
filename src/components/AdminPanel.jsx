import { Link } from "react-router-dom";

const AdminPanel = ({ children }) => {
  return (
    <div className="glass grid grid-cols-6 md:mt-56 mt-36 xl:w-[90%] w-full bg-purpleglass rounded-xl md:p-12 p-4 gap-x-12 shadow-2xl">
      <h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center bg-white rounded-xl shadow-inner shadow-black">
        Admin Panel
      </h1>
      <div className="col-span-1 flex flex-col bg-white rounded-xl items-center h-fit sticky top-[10rem] shadow-inner shadow-black">
        <ul>
          <li className="text-text text-[1.4rem] font-[700] mb-4">Main Menu</li>
          <li className="text-text text-[1.2rem] font-[600]">Users</li>
          <ul className="pl-4 pb-4">
            <li>
              <Link to="/admin/">Main</Link>
            </li>
            <li>
              <Link to="/admin/one">One Page</Link>
            </li>
            <li>
              <Link to="/admin/other">Other Page</Link>
            </li>
          </ul>
          <li className="text-text text-[1.2rem] font-[600]">Blog</li>
          <ul className="pl-4 pb-4">
            <li>Option</li>
            <li>Option</li>
          </ul>
          <li className="text-text text-[1.2rem] font-[600]">Shop</li>
          <ul className="pl-4 pb-4">
            <li>Option</li>
            <li>Option</li>
            <li>Option</li>
          </ul>
        </ul>
      </div>
      <div className="col-span-5 bg-white rounded-xl min-h-screen shadow-inner shadow-black p-4">
        {children}
      </div>
    </div>
  );
};

export default AdminPanel;
