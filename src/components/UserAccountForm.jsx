import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import { useState, useContext, useEffect } from "react";
import { updateUserData } from "../utils/firebase";
import { UserContext } from "../context";
import {
  Theme_Button,
  Theme_Input,
  Theme_PhoneInput,
  userPageStyle,
  userPhoneInputStyle,
} from "../styles";

const UserAccountForm = ({ userData, setUserData, currentUser }) => {
  const { text } = useContext(UserContext);

  const defaultForm = {
    fullName: userData.fullName ? userData.fullName : "",
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

  useEffect(() => {
    if (userData) setUserAccountForm(defaultForm);
  }, [userData]);

  const errorSwal = (error) => {
    Swal.fire({
      icon: "error",
      title: text.userAccountForm.swal.errorTitle,
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
        errorSwal(text.userAccountForm.swal.errorName);
        return;
      case displayName && !withNumberRegex.test(displayName):
        errorSwal(text.userAccountForm.swal.errorDisplayName);
        return;
      case country && !normalRegex.test(country):
        errorSwal(text.userAccountForm.swal.errorCountry);
        return;
      case city && !normalRegex.test(city):
        errorSwal(text.userAccountForm.swal.errorCity);
        return;
      case address && !withNumberRegex.test(address):
        errorSwal(text.userAccountForm.swal.errorAddress);
        return;
      case zipCode && !withNumberRegex.test(zipCode):
        errorSwal(text.userAccountForm.swal.errorZip);
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
              title: text.userAccountForm.swal.successMessage,
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
        errorSwal(text.userAccountForm.swal.errorNotUpdated);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-7 px-16 py-6 gap-y-2"
    >
      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        {text.userAccountForm.fullName}
        <Theme_Input
          type="text"
          placeholder="Your name"
          name="fullName"
          value={fullName}
          $outlinecolor="logo"
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        {text.userAccountForm.displayName}
        <Theme_Input
          type="text"
          placeholder="Your username"
          name="displayName"
          value={displayName}
          $outlinecolor="logo"
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        {text.userAccountForm.email}
        <Theme_Input
          type="text"
          disabled
          placeholder="Your email address"
          name="email"
          $outlinecolor="logo"
          value={email}
          onChange={handleChange}
          className={`${userPageStyle.input} disabled:bg-[#f0f0f0] cursor-not-allowed`}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        {text.userAccountForm.phone}
        <Theme_PhoneInput $outlinecolor="logo">
          <PhoneInput
            required
            country={"hu"}
            value={phone}
            inputStyle={userPhoneInputStyle}
            onChange={handlePhoneChange}
          />
        </Theme_PhoneInput>
      </label>
      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        {text.userAccountForm.country}
        <Theme_Input
          type="text"
          placeholder="Your country"
          name="country"
          value={country}
          $outlinecolor="logo"
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        {text.userAccountForm.city}
        <Theme_Input
          type="text"
          placeholder="Your city"
          name="city"
          value={city}
          $outlinecolor="logo"
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-1`}>
        {text.userAccountForm.address}
        <Theme_Input
          type="text"
          placeholder="Your address"
          name="address"
          value={address}
          $outlinecolor="logo"
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} col-span-3 col-start-5`}>
        {text.userAccountForm.zip}
        <Theme_Input
          type="text"
          placeholder="Your ZIP code"
          name="zipCode"
          value={zipCode}
          $outlinecolor="logo"
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>
      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className={`${userPageStyle.button} ${
          isLoading ? "cursor-progress" : "cursor-pointer"
        } `}
        disabled={isLoading ? true : false}
      >
        {isLoading
          ? text.userAccountForm.savingButton
          : text.userAccountForm.button}
      </Theme_Button>
    </form>
  );
};

export default UserAccountForm;
