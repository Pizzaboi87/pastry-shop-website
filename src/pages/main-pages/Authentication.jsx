import { UserContext } from "../../context";
import { AuthButton, SignInForm, SignUpForm } from "../../components";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Theme_Div,
  authStyle,
  containerStyle,
  formStyle,
  authenticationStyle,
} from "../../styles";

const Authentication = () => {
  const { currentUser, text, isReg, setIsReg } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/shop");
  }, [currentUser]);

  return (
    <Theme_Div
      $bgcolor={isReg ? "glasslight" : "glassdark"}
      $bordercolor="transparent"
      className={authenticationStyle.container}
      style={containerStyle}
    >
      <div className={authenticationStyle.buttonContainer} style={authStyle}>
        <AuthButton
          text={text.authentication.signIn}
          btnText={text.authentication.signInBtn}
          isReg={isReg}
          setIsReg={setIsReg}
        />
        <AuthButton
          text={text.authentication.signUp}
          btnText={text.authentication.signUpBtn}
          isReg={isReg}
          setIsReg={setIsReg}
        />
      </div>
      <div
        className={`${
          isReg ? authenticationStyle.isReg : authenticationStyle.notIsReg
        } ${authenticationStyle.formContainer}`}
        style={formStyle}
      >
        {isReg ? <SignUpForm /> : <SignInForm />}
      </div>
    </Theme_Div>
  );
};

export default Authentication;
