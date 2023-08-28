import PhoneInput from "react-phone-input-2";
import { UserContext } from "../context";
import { useState, useContext, useEffect } from "react";
import { updateUserData } from "../utils/firebase";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";
import {
  Theme_Button,
  Theme_Input,
  Theme_PhoneInput,
  userPageStyle,
  userPhoneInputStyle,
} from "../styles";

const UserAccountForm = ({ userData, setUserData, currentUser }) => {
  const { text } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();

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

  const validationRules = {
    fullName: {
      value: fullName,
      name: "name",
      errorMessage: text.userAccountForm.swal.errorName,
    },
    displayName: {
      value: displayName,
      name: "withNumber",
      errorMessage: text.userAccountForm.swal.errorDisplayName,
    },
    country: {
      value: country,
      name: "normal",
      errorMessage: text.userAccountForm.swal.errorCountry,
    },
    city: {
      value: city,
      name: "normal",
      errorMessage: text.userAccountForm.swal.errorCity,
    },
    address: {
      value: address,
      name: "withNumber",
      errorMessage: text.userAccountForm.swal.errorAddress,
    },
    zipCode: {
      value: zipCode,
      name: "withNumber",
      errorMessage: text.userAccountForm.swal.errorZip,
    },
  };

  const { isValid } = useValidation(validationRules);

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

    if (!isValid()) return;
    try {
      updateUserData(currentUser.uid, userAccountForm)
        .then(() => {
          showSuccessSwal(text.userAccountForm.swal.successMessage);
        })
        .then(() => {
          setIsLoading(false);
          setUserData({ ...userData, ...userAccountForm });
        });
    } catch (error) {
      setIsLoading(false);
      console.error("Error during the update of user's data: ", error);
      showErrorSwal(text.userAccountForm.swal.errorNotUpdated);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={userPageStyle.form}>
      <label className={`${userPageStyle.label} ${userPageStyle.odd}`}>
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

      <label className={`${userPageStyle.label} ${userPageStyle.even}`}>
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

      <label className={`${userPageStyle.label} ${userPageStyle.odd}`}>
        {text.userAccountForm.email}
        <Theme_Input
          type="text"
          disabled
          placeholder="Your email address"
          name="email"
          $outlinecolor="logo"
          value={email}
          onChange={handleChange}
          className={`${userPageStyle.input} ${userPageStyle.email}`}
        />
      </label>

      <label className={`${userPageStyle.label} ${userPageStyle.even}`}>
        {text.userAccountForm.phone}
        <Theme_PhoneInput $outlinecolor="logo" className={userPageStyle.phone}>
          <PhoneInput
            required
            country={"hu"}
            value={phone}
            inputStyle={userPhoneInputStyle}
            onChange={handlePhoneChange}
          />
        </Theme_PhoneInput>
      </label>
      <label className={`${userPageStyle.label} ${userPageStyle.odd}`}>
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

      <label className={`${userPageStyle.label} ${userPageStyle.even}`}>
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

      <label className={`${userPageStyle.label} ${userPageStyle.odd}`}>
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

      <label className={`${userPageStyle.label} ${userPageStyle.even}`}>
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
