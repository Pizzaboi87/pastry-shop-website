import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { UserContext } from "../context";
import { Theme_Button, Theme_Input, userPageStyle } from "../styles";
import { deleteCurrentUser, reauthenticateUser } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const UserDeleteAccountForm = () => {
  const { text, currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const defaultForm = {
    password: "",
  };

  const [form, setForm] = useState(defaultForm);
  const { password } = form;

  const errorSwal = (error) => {
    Swal.fire({
      title: text.userDelete.swal.errorTitle,
      text: error,
      icon: "error",
    });
  };

  const valueCheck = (password) => {
    const passwordRegex =
      /^[A-Za-z0-9,.\-_;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;

    switch (true) {
      case !passwordRegex.test(password):
        errorSwal(text.userDelete.swal.errorPassword);
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

    if (!valueCheck(password)) {
      setIsLoading(false);
      return;
    } else {
      try {
        const result = await Swal.fire({
          title: text.userDelete.swal.title,
          text: text.userDelete.swal.text,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: text.userDelete.swal.confirmButton,
          cancelButtonText: text.userDelete.swal.cancelButton,
        });

        if (result.isConfirmed) {
          await reauthenticateUser(currentUser, password);

          try {
            await deleteCurrentUser(currentUser);
            navigate("/");
            Swal.fire({
              title: text.userDelete.swal.successTitle,
              text: text.userDelete.swal.successText,
              icon: "success",
            }).then(() => {
              setForm(defaultForm);
              setIsLoading(false);
            });
          } catch (error) {
            setIsLoading(false);
            setForm(defaultForm);
            console.log(error);
            errorSwal(text.userDelete.swal.errorText);
          }
        }
      } catch (error) {
        setIsLoading(false);
        setForm(defaultForm);
        console.log(error);
        errorSwal(
          error.code === "auth/wrong-password"
            ? text.userDelete.swal.errorAuth
            : error.code === auth / too - many - requests
            ? text.userDelete.swal.errorTooMany
            : text.userDelete.swal.errorText
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[50%] flex flex-col">
      <label className={`${userPageStyle.label} col-span-2 `}>
        {text.userDelete.password}
        <Theme_Input
          $outlinecolor="logo"
          required
          type="password"
          name="password"
          value={password}
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
        className={`${userPageStyle.deleteButton} ${
          isLoading ? "cursor-progress" : "cursor-pointer"
        } `}
      >
        {isLoading ? text.userDelete.loading : text.userDelete.button}
      </Theme_Button>
    </form>
  );
};

export default UserDeleteAccountForm;
