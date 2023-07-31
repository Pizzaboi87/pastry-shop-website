import { useContext, useState } from "react";
import TransitionParent from "./TransitionParent";
import { blogNewFormStyle } from "../styles";
import Swal from "sweetalert2";
import { otherText } from "../constants";
import { AdminContext } from "../context";

const AdminLogin = () => {
  const [isAdmin, setIsAdmin] = useContext(AdminContext);

  const defaultForm = {
    user: "",
    password: "",
  };

  const [form, setForm] = useState(defaultForm);
  const { user, password } = form;

  const errorSwal = (error) => {
    Swal.fire({
      icon: "error",
      title: otherText.signInForm.swal.errorTitle,
      text: error,
    });
  };

  const valueCheck = (user, password) => {
    const nameRegex = /^[A-Za-z-/ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;
    const passwordRegex =
      /^[A-Za-z0-9,.\-_;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;

    switch (true) {
      case !nameRegex.test(user):
        errorSwal(otherText.signInForm.swal.errorEmail);
        return;
      case !passwordRegex.test(password):
        errorSwal(otherText.signInForm.swal.errorPassword);
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
      errorSwal("UserName or password is not correct.");
    } else {
      setIsAdmin(true);
    }
  };

  return (
    <TransitionParent isFlex>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-5 w-[40rem] bg-primary rounded-xl shadow-xl items-center p-4 gap-8"
      >
        <h1 className="col-span-3 col-start-2 text-center text-text text-[2rem] font-[600]">
          Admin Login
        </h1>
        <span className="col-span-3 col-start-2 flex flex-col gap-y-4">
          <label className={blogNewFormStyle.label}>
            UserName
            <input
              required
              type="text"
              name="user"
              value={user}
              onChange={handleChange}
              className={blogNewFormStyle.input}
            />
          </label>

          <label className={blogNewFormStyle.label}>
            Password
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={blogNewFormStyle.input}
            />
          </label>
        </span>

        <button className={`${blogNewFormStyle.button} col-span-1 col-start-3`}>
          Login
        </button>
      </form>
    </TransitionParent>
  );
};

export default AdminLogin;
