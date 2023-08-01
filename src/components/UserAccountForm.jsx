import PhoneInput from "react-phone-input-2";
import { userPageStyle, userPhoneInputStyle } from "../styles";
import { useState } from "react";

const UserAccountForm = ({ userData }) => {
  const defaultForm = {
    name: userData.name ? userData.name : "",
    userName: userData.displayName ? userData.displayName : "",
    email: userData.email ? userData.email : "",
    phone: userData.phone ? userData.phone : "",
    country: userData.country ? userData.country : "",
    city: userData.city ? userData.city : "",
    address: userData.address ? userData.address : "",
    zipCode: userData.zipCode ? userData.zipCode : "",
  };

  const [userAccountForm, setUserAccountForm] = useState(defaultForm);
  const { name, userName, email, phone, country, city, address, zipCode } =
    userAccountForm;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserAccountForm({ ...userAccountForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userAccountForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-7 px-16 py-6 gap-y-2"
    >
      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        Name
        <input
          type="text"
          placeholder="Your name."
          value={name}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My UserName
        <input
          type="text"
          placeholder="Your username."
          value={userName}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        My Email Address
        <input
          type="text"
          placeholder="Your email address."
          value={email}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My Phone Number
        <PhoneInput
          required
          country={"hu"}
          value={phone}
          onChange={(phone) =>
            setUserAccountForm({ ...userAccountForm, phone })
          }
          inputStyle={userPhoneInputStyle}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        My Country
        <input
          type="phone"
          placeholder="Your country."
          value={country}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My City
        <input
          type="text"
          placeholder="Your city."
          value={city}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        My Address
        <input
          type="phone"
          placeholder="Your address."
          value={address}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My ZIP Code
        <input
          type="text"
          placeholder="Your ZIP code."
          value={zipCode}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>
      <button className={userPageStyle.button}>Save</button>
    </form>
  );
};

export default UserAccountForm;
