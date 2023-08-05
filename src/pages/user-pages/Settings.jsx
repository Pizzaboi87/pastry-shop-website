import { TransitionParent, UserPanel } from "../../components";
import { otherText } from "../../constants";
import { Theme_Button, Theme_H1, userPageStyle } from "../../styles";

const Settings = () => {
  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {otherText.settingsTitle}
      </Theme_H1>

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

          <Theme_Button
            $bg="logo"
            $hover="dark"
            $textcolor="textlight"
            className={userPageStyle.passwordButton}
          >
            Change
          </Theme_Button>
        </form>

        <hr className="my-8 border-dotted border-t-2 border-logopink" />

        <h2 className="text-text text-[1.4rem] font-[600]">Other Settings</h2>
        <form className="grid grid-cols-6 gap-x-8">
          <label className={`${userPageStyle.label} col-span-2 `}>
            Language
            <select className={userPageStyle.input}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="de">Spanish</option>
              <option value="es">Hungarian</option>
            </select>
          </label>

          <label className={`${userPageStyle.label} col-span-2 `}>
            Currency
            <select className={userPageStyle.input}>
              <option value="usd">EUR</option>
              <option value="eur">USD</option>
              <option value="gbp">GBP</option>
              <option value="cad">HUF</option>
            </select>
          </label>

          <label className={`${userPageStyle.label} col-span-2 `}>
            Color Theme
            <select className={userPageStyle.input}>
              <option value="pink">Pink Delights Emporium</option>
              <option value="blue">Sky Blue Sweets</option>
              <option value="green">Minty Green Enchantment</option>
              <option value="brown">Chocolate Kingdom</option>
            </select>
          </label>

          <span className="flex flex-row items-center gap-x-4 mb-2 col-span-5">
            <input type="checkbox" className="w-[1rem] h-[1rem]" />
            <p>Subscribe to our newsletter</p>
          </span>

          <Theme_Button
            $bg="logo"
            $hover="dark"
            $textcolor="textlight"
            className={userPageStyle.passwordButton}
          >
            Update
          </Theme_Button>
        </form>

        <hr className="my-8 border-dotted border-t-2 border-logopink" />

        <h2 className="text-text text-[1.4rem] font-[600] mt-8">
          Delete Account
        </h2>
        <form className="w-[50%] flex flex-col">
          <label className={`${userPageStyle.label} col-span-2 `}>
            Password
            <input type="password" className={userPageStyle.input} />
          </label>

          <Theme_Button
            $bg="logo"
            $hover="dark"
            $textcolor="textlight"
            className={userPageStyle.deleteButton}
          >
            Delete
          </Theme_Button>
        </form>
      </UserPanel>
    </TransitionParent>
  );
};

export default Settings;
