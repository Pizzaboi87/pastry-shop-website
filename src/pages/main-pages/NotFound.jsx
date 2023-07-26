import { TransitionParent } from "../../components";
import { error404 } from "../../assets";

const NotFound = () => {
  return (
    <TransitionParent isFlex>
      <h1 className="text-brown xl:text-[2rem] text-[2rem] font-[600] mb-8">
        The page you are looking for does not exist.
      </h1>
      <span className="flex items-center justify-center">
        <h1 className="error text-[#e0e0e0] text-[6.4rem] font-[400] mb-5 mr-2">
          ERROR
        </h1>
        <img src={error404} alt="404 error" className="w-[15rem]" />
      </span>
    </TransitionParent>
  );
};

export default NotFound;
