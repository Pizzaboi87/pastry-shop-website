import PhoneInput from "react-phone-input-2";
import { userPageStyle, userPhoneInputStyle } from "../styles";

const UserAccountForm = ({ userData }) => {
  return (
    <form className="grid grid-cols-7 px-16 py-6 gap-y-2">
      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        My Name
        <input
          type="text"
          placeholder="Name"
          value="Peter Weiser"
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My UserName
        <input
          type="text"
          placeholder="Name"
          value={userData.displayName}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        My Email Address
        <input
          type="text"
          placeholder="Name"
          value={userData.email}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My Phone Number
        <PhoneInput
          required
          country={"hu"}
          value="+36201234567"
          inputStyle={userPhoneInputStyle}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        My Country
        <input
          type="phone"
          placeholder="Name"
          value="Greece"
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My City
        <input
          type="text"
          placeholder="Name"
          value="Greece"
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        My Address
        <input
          type="phone"
          placeholder="Name"
          value="Elpidos street 4."
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My ZIP Code
        <input
          type="text"
          placeholder="Name"
          value="17673"
          className={userPageStyle.input}
        />
      </label>
      <button className={userPageStyle.button}>Save</button>
    </form>
  );
};

export default UserAccountForm;
