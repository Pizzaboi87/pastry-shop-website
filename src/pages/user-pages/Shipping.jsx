import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PhoneInput from "react-phone-input-2";
import { TransitionParent, UserPanel } from "../../components";
import { CartContext, UserContext } from "../../context";
import { Icon } from "@iconify/react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../../utils/firebase";
import { useSwalMessage } from "../../utils/useSwalMessage";
import { useValidation } from "../../utils/useValidation";
import {
  Theme_H1,
  userPageStyle,
  myCartStyle,
  Theme_Button,
  Theme_Input,
  Theme_PhoneInput,
  userPhoneInputStyle,
} from "../../styles";

const Shipping = () => {
  const navigate = useNavigate();
  const { orderDetails, setOrderDetails } = useContext(CartContext);
  const { userData, setUserData, currentUser, text } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();
  const [loading, setLoading] = useState(false);

  const MySwal = withReactContent(Swal);
  const SwalLoader = () => {
    return (
      <div className={myCartStyle.swalContainer}>
        <h1 className={myCartStyle.swalMessage}>{text.cart.wait}</h1>
        <Icon icon="eos-icons:loading" className={myCartStyle.swalIcon} />
      </div>
    );
  };

  useEffect(() => {
    if (loading) {
      MySwal.fire({
        html: <SwalLoader />,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
    }
  }, [loading]);

  const defaultForm = {
    fullName: userData.fullName ? userData.fullName : "",
    phone: userData.phone ? userData.phone : "",
    country: userData.country ? userData.country : "",
    city: userData.city ? userData.city : "",
    address: userData.address ? userData.address : "",
    zipCode: userData.zipCode ? userData.zipCode : "",
    saveAsDefault: false,
  };

  const [userAccountForm, setUserAccountForm] = useState(defaultForm);
  const { fullName, phone, country, city, address, zipCode, saveAsDefault } =
    userAccountForm;

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

  const saveAsDefaultFunction = async () => {
    try {
      setLoading(true);
      await updateUserData(currentUser.uid, userAccountForm)
        .then(() => {
          showSuccessSwal(text.userAccountForm.swal.successMessage);
        })
        .then(() => {
          setUserData({ ...userData, ...userAccountForm });
        })
        .then(() => {
          updateOrderDetails();
        })
        .then(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error during the update of user's data: ", error);
      showErrorSwal(text.userAccountForm.swal.errorNotUpdated);
    }
  };

  const updateOrderDetails = async () => {
    await setOrderDetails({
      ...orderDetails,
      fullName: fullName,
      phone: phone,
      country: country,
      city: city,
      address: address,
      zipCode: zipCode,
    });
    navigate("/payment");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "saveAsDefault") {
      setUserAccountForm({ ...userAccountForm, [name]: !saveAsDefault });
    } else setUserAccountForm({ ...userAccountForm, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setUserAccountForm({ ...userAccountForm, phone: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !isValid() ||
      fullName == "" ||
      phone == "" ||
      address == "" ||
      country == "" ||
      city == "" ||
      zipCode == ""
    ) {
      showErrorSwal(text.cart.missingData);
      return;
    } else if (userAccountForm.saveAsDefault) {
      saveAsDefaultFunction();
    } else {
      updateOrderDetails();
    }
  };

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.cart.details}
      </Theme_H1>

      <UserPanel>
        <h1 className={myCartStyle.subTitle}>{text.cart.address}</h1>
        <form onSubmit={handleSubmit} className={myCartStyle.form}>
          <label className={myCartStyle.oddLabel}>
            {text.userAccountForm.fullName}
            <Theme_Input
              type="text"
              placeholder={text.placeholder.name}
              name="fullName"
              value={fullName}
              $outlinecolor="logo"
              onChange={handleChange}
              className={myCartStyle.input}
            />
          </label>

          <label className={myCartStyle.evenLabel}>
            {text.userAccountForm.phone}
            <Theme_PhoneInput
              $outlinecolor="logo"
              className={userPageStyle.phone}
            >
              <PhoneInput
                required
                country={"hu"}
                value={phone}
                inputStyle={userPhoneInputStyle}
                onChange={handlePhoneChange}
              />
            </Theme_PhoneInput>
          </label>

          <label className={myCartStyle.oddLabel}>
            {text.userAccountForm.country}
            <Theme_Input
              type="text"
              placeholder={text.placeholder.country}
              name="country"
              value={country}
              $outlinecolor="logo"
              onChange={handleChange}
              className={myCartStyle.input}
            />
          </label>

          <label className={myCartStyle.evenLabel}>
            {text.userAccountForm.city}
            <Theme_Input
              type="text"
              placeholder={text.placeholder.city}
              name="city"
              value={city}
              $outlinecolor="logo"
              onChange={handleChange}
              className={myCartStyle.input}
            />
          </label>

          <label className={myCartStyle.oddLabel}>
            {text.userAccountForm.address}
            <Theme_Input
              type="text"
              placeholder={text.placeholder.address}
              name="address"
              value={address}
              $outlinecolor="logo"
              onChange={handleChange}
              className={myCartStyle.input}
            />
          </label>

          <label className={myCartStyle.evenLabel}>
            {text.userAccountForm.zip}
            <Theme_Input
              type="text"
              placeholder={text.placeholder.zip}
              name="zipCode"
              value={zipCode}
              $outlinecolor="logo"
              onChange={handleChange}
              className={myCartStyle.input}
            />
          </label>

          <label className={myCartStyle.checkboxLabel}>
            <input
              type="checkbox"
              value={saveAsDefault}
              name="saveAsDefault"
              onChange={handleChange}
              className={myCartStyle.checkbox}
            />
            <p>{text.cart.save}</p>
          </label>
        </form>
        <div className={myCartStyle.buttonContainer}>
          <span className={myCartStyle.buttonSpan}>
            <Theme_Button
              $bgcolor="logo"
              $textcolor="textlight"
              $bordercolor="transparent"
              $hoverbgcolor="dark"
              $hovertextcolor="textlight"
              onClick={() => navigate("/mycart")}
              className={myCartStyle.button}
            >
              <Icon icon="line-md:arrow-left-circle" />
              {text.cart.back}
            </Theme_Button>
            <Theme_Button
              $bgcolor="logo"
              $textcolor="textlight"
              $bordercolor="transparent"
              $hoverbgcolor="dark"
              $hovertextcolor="textlight"
              onClick={handleSubmit}
              disabled={loading}
              className={myCartStyle.button}
            >
              {text.cart.next}
              <Icon icon="line-md:arrow-right-circle" />
            </Theme_Button>
          </span>
        </div>
      </UserPanel>
    </TransitionParent>
  );
};

export default Shipping;
