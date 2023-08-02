import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import { userPageStyle, userPhoneInputStyle } from "../styles";
import { useState } from "react";
import { updateUserData } from "../utils/firebase";
import { otherText } from "../constants";

const UserAccountForm = ({ userData, setUserData, currentUser }) => {
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
  const [isLoading, setIsLoading] = useState(false);
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

  const errorSwal = (error) => {
    Swal.fire({
      icon: "error",
      title: otherText.userAccountForm.swal.errorTitle,
      text: error,
    });
  };

  const valueCheck = (
    fullName,
    displayName,
    country,
    city,
    address,
    zipCode
  ) => {
    const normalRegex = /^[A-Za-z-.()\//ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;
    const withNumberRegex = /^[A-Za-z0-9-.()\//ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;

    switch (true) {
      case fullName && !normalRegex.test(fullName):
        errorSwal(otherText.userAccountForm.swal.errorName);
        return;
      case displayName && !withNumberRegex.test(displayName):
        errorSwal(otherText.userAccountForm.swal.errorDisplayName);
        return;
      case country && !normalRegex.test(country):
        errorSwal(otherText.userAccountForm.swal.errorCountry);
        return;
      case city && !normalRegex.test(city):
        errorSwal(otherText.userAccountForm.swal.errorCity);
        return;
      case address && !withNumberRegex.test(address):
        errorSwal(otherText.userAccountForm.swal.errorAddress);
        return;
      case zipCode && !withNumberRegex.test(zipCode):
        errorSwal(otherText.userAccountForm.swal.errorZip);
        return;
      default:
        return true;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserAccountForm({ ...userAccountForm, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setUserAccountForm({ ...userAccountForm, phone: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!valueCheck(fullName, displayName, country, city, address, zipCode)) {
      return;
    } else {
      try {
        updateUserData(currentUser.uid, userAccountForm)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: otherText.userAccountForm.swal.successMessage,
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .then(() => {
            setIsLoading(false);
            setUserData({ ...userData, ...userAccountForm });
          });
      } catch (error) {
        setIsLoading(false);
        console.error("Error during the update of user's data: ", error);
        errorSwal(otherText.userAccountForm.swal.errorNotUpdated);
      }
    }
  };

  return (
    <div className="col-span-5 bg-white rounded-2xl shadow-inner shadow-black">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-7 px-16 py-6 gap-y-2"
      >
        <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
          {otherText.userAccountForm.fullName}
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
          {otherText.userAccountForm.displayName}
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
          {otherText.userAccountForm.email}
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
          {otherText.userAccountForm.phone}
          <PhoneInput
            required
            country={"hu"}
            value={phone}
            onChange={handlePhoneChange}
            inputStyle={userPhoneInputStyle}
          />
        </label>

        <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
          {otherText.userAccountForm.country}
          <input
            type="text"
            placeholder="Your country"
            name="country"
            value={country}
            onChange={handleChange}
            className={userPageStyle.input}
          />
        </label>

        <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
          {otherText.userAccountForm.city}
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
          {otherText.userAccountForm.address}
          <input
            type="text"
            placeholder="Your address"
            name="address"
            value={address}
            onChange={handleChange}
            className={userPageStyle.input}
          />
        </label>

        <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
          {otherText.userAccountForm.zip}
          <input
            type="text"
            placeholder="Your ZIP code"
            name="zipCode"
            value={zipCode}
            onChange={handleChange}
            className={userPageStyle.input}
          />
        </label>
        <button
          className={`${userPageStyle.button} ${
            isLoading ? "cursor-progress" : "cursor-pointer"
          } `}
          disabled={isLoading ? true : false}
        >
          {isLoading
            ? otherText.userAccountForm.savingButton
            : otherText.userAccountForm.button}
        </button>
      </form>
    </div>
  );
};

export default UserAccountForm;
