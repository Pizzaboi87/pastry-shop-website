import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { UserContext } from "../context";
import { Theme_Button, Theme_Input, userPageStyle } from "../styles";
import { deleteMyself, reauthenticateUser } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSwalMessage } from "../utils/useSwalMessage";

const UserDeleteAccountForm = () => {
  const { text, currentUser } = useContext(UserContext);
  const { showErrorSwal } = useSwalMessage();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const defaultForm = {
    password: "",
  };

  const [form, setForm] = useState(defaultForm);
  const { password } = form;

  const valueCheck = (password) => {
    const passwordRegex = /^[\p{L}0-9,.\-_;:?!()%"@$/€\s]+$/u;

    switch (true) {
      case !passwordRegex.test(password):
        showErrorSwal(text.userDelete.swal.errorPassword);
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
            await deleteMyself(currentUser);
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
            showErrorSwal(text.userDelete.swal.errorText);
          }
        }
      } catch (error) {
        setIsLoading(false);
        setForm(defaultForm);
        console.log(error);
        showErrorSwal(
          error.code === "auth/wrong-password"
            ? text.userDelete.swal.errorAuth
            : error.code === "auth/too-many-requests"
            ? text.userDelete.swal.errorTooMany
            : text.userDelete.swal.errorText
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-[50%] md:flex md:flex-col grid grid-cols-6"
    >
      <label className={`${userPageStyle.label} md:col-span-2 col-span-6`}>
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
