import TransitionParent from "./TransitionParent";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";
import { useContext, useState } from "react";
import { UserContext } from "../context";
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
        className="grid grid-cols-5 md:w-[40rem] w-full rounded-xl shadow-xl items-center p-4 gap-8"
      >
        <h1 className="md:col-span-3 col-span-5 md:col-start-2 text-center text-text text-[2rem] font-[600]">
          Admin Login
        </h1>
        <span className="md:col-span-3 col-span-5 md:col-start-2 flex flex-col gap-y-4">
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
          className={`${adminLoginStyle.button} md:col-span-1 col-span-2 col-start-2 md:col-start-3`}
        >
          Login
        </Theme_Button>
      </Theme_Form>
    </TransitionParent>
  );
};

export default AdminLogin;
