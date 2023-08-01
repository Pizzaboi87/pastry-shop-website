import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import { userPageStyle, userPhoneInputStyle } from "../styles";
import { useState } from "react";
import { updateUserData } from "../utils/firebase";

const UserAccountForm = ({ userData, currentUser }) => {
  const defaultForm = {
    fullName: userData.name ? userData.name : "",
    displayName: userData.displayName ? userData.displayName : "",
    email: userData.email ? userData.email : "",
    phone: userData.phone ? userData.phone : "",
    country: userData.country ? userData.country : "",
    city: userData.city ? userData.city : "",
    address: userData.address ? userData.address : "",
    zipCode: userData.zipCode ? userData.zipCode : "",
  };

  const [userAccountForm, setUserAccountForm] = useState(defaultForm);
  const {
    fullName,
    displayName,
    email,
    phone,
    country,
    city,
    address,
    zipCode,
  } = userAccountForm;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserAccountForm({ ...userAccountForm, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setUserAccountForm({ ...userAccountForm, phone: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateUserData(currentUser.uid, userAccountForm).then(() => {
        Swal.fire({
          icon: "success",
          title: "Your data has been updated!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } catch (error) {
      console.error("Error during the update of user's data: ", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Sorry, we couldn't update your data!",
      });
    }
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
          placeholder="Your name"
          name="fullName"
          value={fullName}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My UserName
        <input
          type="text"
          placeholder="Your username"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        My Email Address
        <input
          type="text"
          disabled
          placeholder="Your email address"
          name="email"
          value={email}
          onChange={handleChange}
          className={`${userPageStyle.input} disabled:bg-[#f0f0f0] cursor-not-allowed`}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My Phone Number
        <PhoneInput
          required
          country={"hu"}
          value={phone}
          onChange={handlePhoneChange}
          inputStyle={userPhoneInputStyle}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        My Country
        <input
          type="phone"
          placeholder="Your country"
          name="country"
          value={country}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My City
        <input
          type="text"
          placeholder="Your city"
          name="city"
          value={city}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        My Address
        <input
          type="phone"
          placeholder="Your address"
          name="address"
          value={address}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        My ZIP Code
        <input
          type="text"
          placeholder="Your ZIP code"
          name="zipCode"
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
