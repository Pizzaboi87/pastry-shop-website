import { TransitionParent, UserPanel } from "../../components";
import { otherText } from "../../constants";
import { userPageStyle } from "../../styles";

const Settings = () => {
  return (
    <TransitionParent isFlex={false}>
      <h1 className={userPageStyle.title}>{otherText.settingsTitle}</h1>

      <UserPanel>
        <h2 className="text-text text-[1.4rem] font-[600]">Password reset</h2>
        <form className="grid grid-cols-6 gap-x-8">
          <label className={`${userPageStyle.label} col-span-2 `}>
            Current Password
            <input type="password" className={userPageStyle.input} />
          </label>

          <label className={`${userPageStyle.label} col-span-2 `}>
            New Password
            <input type="password" className={userPageStyle.input} />
          </label>

          <label className={`${userPageStyle.label} col-span-2 `}>
            Confirm Password
            <input type="password" className={userPageStyle.input} />
          </label>

          <button className={userPageStyle.passwordButton}>Change</button>
        </form>
      </UserPanel>
    </TransitionParent>
  );
};

export default Settings;
