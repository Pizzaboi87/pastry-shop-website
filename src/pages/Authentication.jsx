import { useContext } from "react";
import { authStyle, containerStyle, formStyle } from "../styles";
import { AuthButton, SignInForm, SignUpForm } from "../components";
import { IsRegContext } from "../context";

const Authentication = () => {
  const [isReg, setIsReg] = useContext(IsRegContext);

  return (
    <div
      className={`${
        isReg ? "bg-[#566bce]" : "bg-yellowdark"
      } mt-16 h-[102vh] xl:w-[90%] 3xl:w-[80%] w-full  rounded-xl md:p-12 p-4 flex flex-col items-center justify-center relative`}
      style={containerStyle}
    >
      <div
        className="blueBg w-[80%] h-[70vh] flex items-center rounded-xl"
        style={authStyle}
      >
        <AuthButton
          text="Already have an account?"
          btnText="Sign In"
          isReg={isReg}
          setIsReg={setIsReg}
        />
        <AuthButton
          text="Don't have an account?"
          btnText="Sign Up"
          isReg={isReg}
          setIsReg={setIsReg}
        />
      </div>
      <div
        className={`${
          isReg ? "left-[47%] rounded-r-xl" : "left-[12.5%] rounded-l-xl"
        } formBox absolute w-[40%] h-[75vh] bg-white z-[10] flex justify-center items-center`}
        style={formStyle}
      >
        {isReg ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
};

export default Authentication;
