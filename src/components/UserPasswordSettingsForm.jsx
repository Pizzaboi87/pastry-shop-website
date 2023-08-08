import { useContext } from "react";
import { UserContext } from "../context";
import { Theme_Button, Theme_Input, userPageStyle } from "../styles";

const UserPasswordSettingsForm = () => {
  const { text } = useContext(UserContext);

  return (
    <form className="grid grid-cols-6 gap-x-8">
      <label className={`${userPageStyle.label} col-span-2 `}>
        {text.userPasswordForm.current}
        <Theme_Input
          $outlinecolor="logo"
          type="password"
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-2 `}>
        {text.userPasswordForm.new}
        <Theme_Input
          $outlinecolor="logo"
          type="password"
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-2 `}>
        {text.userPasswordForm.confirm}
        <Theme_Input
          $outlinecolor="logo"
          type="password"
          className={userPageStyle.input}
        />
      </label>

      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className={userPageStyle.passwordButton}
      >
        {text.userPasswordForm.button}
      </Theme_Button>
    </form>
  );
};

export default UserPasswordSettingsForm;
