import { Theme_Button, Theme_Input, userPageStyle } from "../styles";

const UserPasswordSettingsForm = () => {
  return (
    <form className="grid grid-cols-6 gap-x-8">
      <label className={`${userPageStyle.label} col-span-2 `}>
        Current Password
        <Theme_Input
          $outlinecolor="logo"
          type="password"
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-2 `}>
        New Password
        <Theme_Input
          $outlinecolor="logo"
          type="password"
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-2 `}>
        Confirm Password
        <Theme_Input
          $outlinecolor="logo"
          type="password"
          className={userPageStyle.input}
        />
      </label>

      <Theme_Button
        $bgcolor="logo"
        $hoverbgcolor="dark"
        $textcolor="textlight"
        className={userPageStyle.passwordButton}
      >
        Change
      </Theme_Button>
    </form>
  );
};

export default UserPasswordSettingsForm;
