import { Theme_Button, authButtonStyle } from "../styles";

const AuthButton = ({ text, btnText, setIsReg, isReg }) => {
  return (
    <div className={authButtonStyle.wrapper}>
      <h2 className={authButtonStyle.title}>{text}</h2>
      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className={authButtonStyle.button}
        onClick={() => setIsReg(!isReg)}
      >
        {btnText}
      </Theme_Button>
    </div>
  );
};

export default AuthButton;
