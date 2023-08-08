import Swal from "sweetalert2";
import TransitionParent from "./TransitionParent";
import { useContext, useState } from "react";
import { AdminContext, LanguageContext } from "../context";
import {
  Theme_Button,
  Theme_Form,
  Theme_Input,
  adminLoginStyle,
} from "../styles";

const AdminLogin = () => {
  const { setIsAdmin } = useContext(AdminContext);
  const { text } = useContext(LanguageContext);

  const defaultForm = {
    user: "",
    password: "",
  };

  const [form, setForm] = useState(defaultForm);
  const { user, password } = form;

  const errorSwal = (error) => {
    Swal.fire({
      icon: "error",
      title: text.adminLogin.swal.errorTitle,
      text: error,
    });
  };

  const valueCheck = (user, password) => {
    const nameRegex = /^[A-Za-z-/ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;
    const passwordRegex =
      /^[A-Za-z0-9,.\-_;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;

    switch (true) {
      case !nameRegex.test(user):
        errorSwal(text.adminLogin.swal.errorUser);
        return;
      case !passwordRegex.test(password):
        errorSwal(text.adminLogin.swal.errorPassword);
        return;
      default:
        return true;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!valueCheck(user, password)) return;
    else if (
      user !== import.meta.env.VITE_ADMIN_NAME ||
      password !== import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      errorSwal(text.adminLogin.swal.errorWrongCredentials);
    } else {
      setIsAdmin(true);
    }
  };

  return (
    <TransitionParent isFlex>
      <Theme_Form
        $bgcolor="primary"
        onSubmit={handleSubmit}
        className="grid grid-cols-5 w-[40rem] rounded-xl shadow-xl items-center p-4 gap-8"
      >
        <h1 className="col-span-3 col-start-2 text-center text-text text-[2rem] font-[600]">
          Admin Login
        </h1>
        <span className="col-span-3 col-start-2 flex flex-col gap-y-4">
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
          className={`${adminLoginStyle.button} col-span-1 col-start-3`}
        >
          Login
        </Theme_Button>
      </Theme_Form>
    </TransitionParent>
  );
};

export default AdminLogin;
