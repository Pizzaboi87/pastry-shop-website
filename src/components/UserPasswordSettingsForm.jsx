import { useContext, useState } from "react";
import { UserContext } from "../context";
import { Theme_Button, Theme_Input, userPageStyle } from "../styles";
import Swal from "sweetalert2";
import { updateUserPassword } from "../utils/firebase";
import { set } from "firebase/database";

const UserPasswordSettingsForm = () => {
  const { text, currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const defaultForm = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [form, setForm] = useState(defaultForm);
  const { currentPassword, newPassword, confirmPassword } = form;

  const errorSwal = (error) => {
    Swal.fire({
      title: text.userPasswordForm.swal.errorTitle,
      text: error,
      icon: "error",
    });
  };

  const valueCheck = (currentPassword, newPassword, confirmPassword) => {
    const passwordRegex =
      /^[A-Za-z0-9,.\-_;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;

    switch (true) {
      case !passwordRegex.test(currentPassword):
        errorSwal(text.userPasswordForm.swal.errorPassword);
        return;
      case !passwordRegex.test(newPassword):
        errorSwal(text.userPasswordForm.swal.errorPassword);
        return;
      case !passwordRegex.test(confirmPassword):
        errorSwal(text.userPasswordForm.swal.errorPassword);
        return;
      case newPassword !== confirmPassword:
        errorSwal(text.userPasswordForm.swal.errorMatch);
        return;
      default:
        return true;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!valueCheck(currentPassword, newPassword, confirmPassword)) {
      setIsLoading(false);
      return;
    } else {
      try {
        await updateUserPassword(currentUser, currentPassword, newPassword);
        Swal.fire({
          title: text.userPasswordForm.swal.successTitle,
          text: text.userPasswordForm.swal.successText,
          icon: "success",
        }).then(() => {
          setIsLoading(false);
          setForm(defaultForm);
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        errorSwal(
          error.code === "auth/wrong-password"
            ? text.userPasswordForm.swal.errorAuth
            : text.userPasswordForm.swal.errorText
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-x-8">
      <label className={`${userPageStyle.label} col-span-2 `}>
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

      <label className={`${userPageStyle.label} col-span-2 `}>
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

      <label className={`${userPageStyle.label} col-span-2 `}>
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
          isLoading ? "cursor-progress" : "cursor-pointer"
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
