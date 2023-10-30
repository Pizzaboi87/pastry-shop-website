import PhoneInput from "react-phone-input-2";
import { UserContext } from "../context";
import { useState, useContext, useEffect } from "react";
import { updateUserData } from "../utils/firebase";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";
import {
  Theme_Input,
  Theme_PhoneInput,
  userPageStyle,
  userPhoneInputStyle,
} from "../styles";

const ShippingForm = ({ userData, setUserData, currentUser }) => {
  const { text } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();

  const defaultForm = {
    fullName: userData.fullName ? userData.fullName : "",
    phone: userData.phone ? userData.phone : "",
    country: userData.country ? userData.country : "",
    city: userData.city ? userData.city : "",
    address: userData.address ? userData.address : "",
    zipCode: userData.zipCode ? userData.zipCode : "",
  };

  const [userAccountForm, setUserAccountForm] = useState(defaultForm);
  const { fullName, phone, country, city, address, zipCode } = userAccountForm;

  useEffect(() => {
    if (userData) setUserAccountForm(defaultForm);
  }, [userData]);

  const validationRules = {
    fullName: {
      value: fullName,
      name: "name",
      errorMessage: text.userAccountForm.swal.errorName,
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

  //Check if user wants to save the address as default
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid()) return;
    try {
      updateUserData(currentUser.uid, userAccountForm)
        .then(() => {
          showSuccessSwal(text.userAccountForm.swal.successMessage);
        })
        .then(() => {
          setUserData({ ...userData, ...userAccountForm });
        });
    } catch (error) {
      console.error("Error during the update of user's data: ", error);
      showErrorSwal(text.userAccountForm.swal.errorNotUpdated);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={userPageStyle.form}>
      <label className={userPageStyle.oddLabel}>
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

      <label className={userPageStyle.evenLabel}>
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

      <label className={userPageStyle.oddLabel}>
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

      <label className={userPageStyle.evenLabel}>
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

      <label className={userPageStyle.oddLabel}>
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

      <label className={userPageStyle.evenLabel}>
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

      <label className="col-span-2 flex mb-6">
        <input type="checkbox" className="mr-4 w-[1rem]" />
        <p>Save as default address</p>
      </label>
    </form>
  );
};

export default ShippingForm;
