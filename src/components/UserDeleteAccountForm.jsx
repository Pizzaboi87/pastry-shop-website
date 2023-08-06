import { Theme_Button, Theme_Input, userPageStyle } from "../styles";

const UserDeleteAccountForm = () => {
  return (
    <form className="w-[50%] flex flex-col">
      <label className={`${userPageStyle.label} col-span-2 `}>
        Password
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
        className={userPageStyle.deleteButton}
      >
        Delete
      </Theme_Button>
    </form>
  );
};

export default UserDeleteAccountForm;
