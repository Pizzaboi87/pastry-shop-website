import { text } from "../../constants";
import { Theme_H1, Theme_Hr, userPageStyle } from "../../styles";
import {
  TransitionParent,
  UserDeleteAccountForm,
  UserOtherSettingsForm,
  UserPasswordSettingsForm,
  UserPanel,
} from "../../components";

const Settings = () => {
  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.settingsTitle}
      </Theme_H1>

      <UserPanel>
        <h2 className="text-text text-[1.4rem] font-[600]">Password reset</h2>
        <UserPasswordSettingsForm />

        <Theme_Hr
          $bordercolor="logo"
          className="my-8 border-dotted border-t-2"
        />

        <h2 className="text-text text-[1.4rem] font-[600]">Other Settings</h2>
        <UserOtherSettingsForm />

        <Theme_Hr
          $bordercolor="logo"
          className="my-8 border-dotted border-t-2"
        />

        <h2 className="text-text text-[1.4rem] font-[600] mt-8">
          Delete Account
        </h2>
        <UserDeleteAccountForm />
      </UserPanel>
    </TransitionParent>
  );
};

export default Settings;
