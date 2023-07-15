import { Link } from "react-router-dom";

const LinkButton = ({ children, extraClass, whereTo }) => {
  return (
    <Link
      to={whereTo}
      className={`${extraClass} bg-logopink rounded-[15px] shadow-sm border-none hover:bg-pinkdark text-white text-center`}
    >
      <button>{children}</button>
    </Link>
  );
};

export default LinkButton;
