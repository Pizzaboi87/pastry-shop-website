import { useContext } from "react";
import { LanguageContext } from "../context";
import { Theme_Button, Theme_Input, userPageStyle } from "../styles";

const UserDeleteAccountForm = () => {
  const { text } = useContext(LanguageContext);

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
        $hoverbgcolor="dark"
        $textcolor="textlight"
        className={userPageStyle.deleteButton}
      >
        {text.userDelete.button}
      </Theme_Button>
    </form>
  );
};

export default UserDeleteAccountForm;
