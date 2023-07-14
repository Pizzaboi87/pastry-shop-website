import { Link } from "react-router-dom";

const LinkButton = ({ children, extraClass, whereTo }) => {
  return (
    <button
      className={`${extraClass} bg-logopink rounded-[15px] shadow-sm border-none hover:bg-pinkdark text-white`}
    >
      <Link to={whereTo}>{children}</Link>
    </button>
  );
};

export default LinkButton;
