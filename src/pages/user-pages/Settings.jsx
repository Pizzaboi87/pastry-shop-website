import { Navigate } from "react-router-dom";
import { UserContext } from "../../context";
import { useContext } from "react";
import { Theme_H1, Theme_Hr, userPageStyle, settingsStyle } from "../../styles";
import {
  TransitionParent,
  UserDeleteAccountForm,
  UserOtherSettingsForm,
  UserPasswordSettingsForm,
  UserPanel,
} from "../../components";

const Settings = () => {
  const { text, currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.settingsTitle}
      </Theme_H1>

      <UserPanel>
        <h2 className={settingsStyle.title}>{text.settings.reset}</h2>
        <UserPasswordSettingsForm />

        <Theme_Hr $bordercolor="logo" className={settingsStyle.hrLine} />

        <h2 className={settingsStyle.title}>{text.settings.other}</h2>
        <UserOtherSettingsForm />

        <Theme_Hr $bordercolor="logo" className={settingsStyle.hrLine} />

        <h2 className={settingsStyle.titleMt}>{text.settings.delete}</h2>
        <UserDeleteAccountForm />
      </UserPanel>
    </TransitionParent>
  );
};

export default Settings;
