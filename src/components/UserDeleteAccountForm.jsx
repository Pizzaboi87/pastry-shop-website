import { UserContext } from "../context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";
import { deleteMyself, reauthenticateUser } from "../utils/firebase";
import {
  Theme_Button,
  Theme_Input,
  userDeleteFormStyle,
  userPageStyle,
} from "../styles";

const UserDeleteAccountForm = () => {
  const { text, currentUser } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal, showQuestionSwal } = useSwalMessage();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const defaultForm = {
    password: "",
  };

  const [form, setForm] = useState(defaultForm);
  const { password } = form;

  const validationRules = {
    password: {
      value: password,
      regex: "password",
      errorMessage: text.userDelete.swal.errorPassword,
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
    } else {
      try {
        const result = await showQuestionSwal(text.userDelete.swal.text);

        if (result.isConfirmed) {
          await reauthenticateUser(currentUser, password);

          try {
            await deleteMyself(currentUser);
            navigate("/");
            showSuccessSwal(text.userDelete.swal.successText).then(() => {
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
    <form onSubmit={handleSubmit} className={userDeleteFormStyle.form}>
      <label className={`${userPageStyle.label} ${userDeleteFormStyle.label}`}>
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
