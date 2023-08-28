import TransitionParent from "./TransitionParent";
import { UserContext } from "../context";
import { useContext, useState } from "react";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";
import {
  Theme_Button,
  Theme_Form,
  Theme_Input,
  adminLoginStyle,
} from "../styles";

const AdminLogin = () => {
  const { text, setIsAdmin } = useContext(UserContext);
  const { showErrorSwal } = useSwalMessage();

  const defaultForm = {
    user: "",
    password: "",
  };

  const [form, setForm] = useState(defaultForm);
  const { user, password } = form;

  const validationRules = {
    user: {
      value: user,
      regex: "name",
      errorMessage: text.adminLogin.swal.errorUser,
    },
    password: {
      value: password,
      regex: "password",
      errorMessage: text.adminLogin.swal.errorPassword,
    },
  };

  const { isValid } = useValidation(validationRules);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid()) return;
    else if (
      user !== import.meta.env.VITE_ADMIN_NAME ||
      password !== import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      showErrorSwal(text.adminLogin.swal.errorWrongCredentials);
    } else {
      setIsAdmin(true);
    }
  };

  return (
    <TransitionParent isFlex>
      <Theme_Form
        $bgcolor="primary"
        onSubmit={handleSubmit}
        className={adminLoginStyle.form}
      >
        <h1 className={adminLoginStyle.title}>Admin Login</h1>
        <span className={adminLoginStyle.span}>
          <label className={adminLoginStyle.label}>
            UserName
            <Theme_Input
              $outlinecolor="logo"
              required
              type="text"
              name="user"
              value={user}
              onChange={handleChange}
              className={adminLoginStyle.input}
            />
          </label>

          <label className={adminLoginStyle.label}>
            Password
            <Theme_Input
              $outlinecolor="logo"
              required
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={adminLoginStyle.input}
            />
          </label>
        </span>

        <Theme_Button
          $bgcolor="logo"
          $textcolor="textlight"
          $bordercolor="transparent"
          $hoverbgcolor="dark"
          $hovertextcolor="textlight"
          className={adminLoginStyle.button}
        >
          Login
        </Theme_Button>
      </Theme_Form>
    </TransitionParent>
  );
};

export default AdminLogin;
