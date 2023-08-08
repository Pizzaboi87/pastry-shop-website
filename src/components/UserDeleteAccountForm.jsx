import { useContext } from "react";
import { UserContext } from "../context";
import { Theme_Button, Theme_Input, userPageStyle } from "../styles";

const UserDeleteAccountForm = () => {
  const { text } = useContext(UserContext);

  return (
    <form className="w-[50%] flex flex-col">
      <label className={`${userPageStyle.label} col-span-2 `}>
        {text.userDelete.password}
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
        className={userPageStyle.deleteButton}
      >
        {text.userDelete.button}
      </Theme_Button>
    </form>
  );
};

export default UserDeleteAccountForm;
