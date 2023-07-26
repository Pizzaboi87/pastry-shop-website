import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStyle, containerStyle, formStyle } from "../../styles";
import { AuthButton, SignInForm, SignUpForm } from "../../components";
import { IsRegContext, UserContext } from "../../context";

const Authentication = () => {
  const [isReg, setIsReg] = useContext(IsRegContext);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) navigate("/shop");
  }, [currentUser]);

  return (
    <div
      className={`${
        isReg ? "bg-glass" : "bg-purpleglass"
      } glass shadow-xl mt-16 lg:h-[102vh] h-[90vh] xl:w-[90%] 3xl:w-[80%] w-full rounded-xl md:p-12 p-4 flex flex-col items-center justify-center relative`}
      style={containerStyle}
    >
      <div
        className="lg:w-[80%] w-[85%] lg:h-[70vh] h-[90%] lg:mt-0 mt-[15%] flex items-center justify-between lg:flex-row flex-col rounded-xl"
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
          isReg
            ? "lg:left-[47.5%] lg:top-auto xs:top-[27%] md:top-[29%] ms:top-[31%] top-[26%] lg:rounded-r-xl rounded-xl"
            : "lg:left-[12.5%] lg:top-auto xs:top-[10%] ms:top-[14%] top-[9.75%] lg:rounded-l-xl rounded-xl"
        } absolute lg:w-[40%] w-[85%] lg:h-[75vh] md:h-[68%] ms:h-[67%] h-[70%] bg-white z-[10] flex justify-center items-center`}
        style={formStyle}
      >
        {isReg ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
};

export default Authentication;