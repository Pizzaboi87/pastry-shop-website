import { UserContext } from "../context";
import { useContext, useState } from "react";
import { updateUserPassword } from "../utils/firebase";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";
import {
  Theme_Button,
  Theme_Input,
  userPageStyle,
  userPasswordStyle,
} from "../styles";

const UserPasswordSettingsForm = () => {
  const { text, currentUser } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();
  const [isLoading, setIsLoading] = useState(false);

  const defaultForm = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [form, setForm] = useState(defaultForm);
  const { currentPassword, newPassword, confirmPassword } = form;

  const validationRules = {
    currentPassword: {
      value: currentPassword,
      regex: "password",
      errorMessage: text.userPasswordForm.swal.errorPassword,
    },
    newPassword: {
      value: newPassword,
      regex: "password",
      errorMessage: text.userPasswordForm.swal.errorPassword,
    },
    confirmPassword: {
      value: confirmPassword,
      regex: "password",
      errorMessage: text.userPasswordForm.swal.errorPassword,
    },
  };

  const { isValid } = useValidation(validationRules);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!isValid()) {
      setIsLoading(false);
      return;
    } else if (newPassword !== confirmPassword) {
      setIsLoading(false);
      showErrorSwal(text.userPasswordForm.swal.errorMatch);
      return;
    } else {
      try {
        await updateUserPassword(currentUser, currentPassword, newPassword);
        showSuccessSwal(text.userPasswordForm.swal.successText).then(() => {
          setIsLoading(false);
          setForm(defaultForm);
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        showErrorSwal(
          error.code === "auth/wrong-password"
            ? text.userPasswordForm.swal.errorAuth
            : error.code === "auth/too-many-requests"
            ? text.userPasswordForm.swal.errorTooMany
            : text.userPasswordForm.swal.errorText
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={userPasswordStyle.form}>
      <label className={`${userPageStyle.label} ${userPasswordStyle.label}`}>
        {text.userPasswordForm.current}
        <Theme_Input
          $outlinecolor="logo"
          required
          type="password"
          name="currentPassword"
          value={currentPassword}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} ${userPasswordStyle.label}`}>
        {text.userPasswordForm.new}
        <Theme_Input
          $outlinecolor="logo"
          required
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
          className={userPageStyle.input}
        />
      </label>

      <label className={`${userPageStyle.label} ${userPasswordStyle.label}`}>
        {text.userPasswordForm.confirm}
        <Theme_Input
          $outlinecolor="logo"
          required
          type="password"
          name="confirmPassword"
          value={confirmPassword}
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
        type="submit"
        disabled={isLoading ? true : false}
        className={`${userPageStyle.passwordButton} ${
          isLoading ? userPageStyle.loading : userPageStyle.notLoading
        }`}
      >
        {isLoading
          ? text.userPasswordForm.loading
          : text.userPasswordForm.button}
      </Theme_Button>
    </form>
  );
};

export default UserPasswordSettingsForm;
