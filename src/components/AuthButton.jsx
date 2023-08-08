import { Theme_Button } from "../styles";

const AuthButton = ({ text, btnText, setIsReg, isReg }) => {
  return (
    <div className="relative lg:w-[50%] w-full lg:h-full h-[14vh] flex flex-col items-center justify-center">
      <h2 className="text-text font-[500] xs:text-[1.2rem] text-[0.9rem] mb-2">
        {text}
      </h2>
      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className="rounded-xl shadow-sm border-none font-[400] text-center px-3 xs:py-2 py-1"
        onClick={() => setIsReg(!isReg)}
      >
        {btnText}
      </Theme_Button>
    </div>
  );
};

export default AuthButton;
