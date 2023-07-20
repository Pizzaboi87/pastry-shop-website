import { useState } from "react";
import { authStyle, containerStyle, formStyle } from "../styles";
import { AuthButton } from "../components";

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div
      className={`${
        isSignIn ? "bg-[#03a9f4]" : "bg-pinklight"
      } md:mt-56 mt-36 min-h-[100vh] xl:w-[90%] 3xl:w-[80%] w-full  rounded-xl md:p-12 p-4 flex flex-col items-center justify-center relative`}
      style={containerStyle}
    >
      <div
        className="blueBg w-[80%] h-[70vh] flex items-center rounded-xl"
        style={authStyle}
      >
        <AuthButton
          text="Already have an account?"
          btnText="Sign In"
          isSignIn={isSignIn}
          setIsSignIn={setIsSignIn}
        />
        <AuthButton
          text="Don't have an account?"
          btnText="Sign Up"
          isSignIn={isSignIn}
          setIsSignIn={setIsSignIn}
        />
      </div>
      <div
        className={`${
          isSignIn ? "left-[12.5%] rounded-l-xl" : "left-[47%] rounded-r-xl"
        } formBox absolute w-[40%] h-[75vh] bg-white z-[10] flex justify-center items-center`}
        style={formStyle}
      ></div>
    </div>
  );
};

export default Authentication;
