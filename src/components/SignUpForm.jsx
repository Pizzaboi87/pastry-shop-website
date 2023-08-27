import { useState, useContext } from "react";
import { UserContext } from "../context";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Theme_Button, Theme_Input, signUpFormStyle } from "../styles";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../utils/firebase";

const SignUpForm = () => {
  const { text } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();
  const navigate = useNavigate();

  const defaultForm = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const resetForm = () => {
    setForm(defaultForm);
  };

  const [form, setForm] = useState(defaultForm);
  const { displayName, email, password, confirmPassword } = form;

  const validationRules = {
    displayName: {
      value: displayName,
      regex: "name",
      errorMessage: text.signUpForm.swal.errorName,
    },
    email: {
      value: email,
      regex: "email",
      errorMessage: text.signUpForm.swal.errorEmail,
    },
    password: {
      value: password,
      regex: "password",
      errorMessage: text.signUpForm.swal.errorPassword,
    },
  };

  const { isValid } = useValidation(validationRules);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValid()) return;
    else if (password !== confirmPassword) {
      showErrorSwal(text.signUpForm.swal.errorPasswordMatch);
      return;
    } else {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );

        await createUserDocumentFromAuth(user, { displayName }).then(() => {
          showSuccessSwal(text.signUpForm.swal.successText);
        });
        resetForm();
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          showErrorSwal(text.signUpForm.swal.errorInUse);
        } else {
          showErrorSwal(text.signUpForm.swal.errorOther);
          console.log(error);
        }
      } finally {
        navigate("/");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, maxHeight: 0 }}
      animate={{ opacity: 1, maxHeight: "75vh" }}
      exit={{ opacity: 0, maxHeight: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col w-full h-full items-center justify-center"
    >
      <h1 className="xl:text-4xl lg:text-xl md:text-4xl text-xl text-center text-text font-[600] mb-6">
        {text.signUpForm.title}
      </h1>
      <form className="flex flex-col items-start" onSubmit={handleSubmit}>
        <label className={signUpFormStyle.label}>
          {text.signUpForm.userName}
          <Theme_Input
            required
            type="text"
            name="displayName"
            value={displayName}
            $outlinecolor="logo"
            onChange={handleChange}
            className={signUpFormStyle.input}
          />
        </label>

        <label className={signUpFormStyle.label}>
          {text.signUpForm.email}
          <Theme_Input
            required
            type="email"
            name="email"
            value={email}
            $outlinecolor="logo"
            onChange={handleChange}
            className={signUpFormStyle.input}
          />
        </label>

        <label className={signUpFormStyle.label}>
          {text.signUpForm.password}
          <Theme_Input
            required
            type="password"
            name="password"
            value={password}
            $outlinecolor="logo"
            onChange={handleChange}
            className={signUpFormStyle.input}
          />
        </label>

        <label className={signUpFormStyle.label}>
          {text.signUpForm.confirmPassword}
          <Theme_Input
            required
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            $outlinecolor="logo"
            onChange={handleChange}
            className={signUpFormStyle.input}
          />
        </label>

        <Theme_Button
          $bgcolor="logo"
          $textcolor="textlight"
          $bordercolor="transparent"
          $hoverbgcolor="dark"
          $hovertextcolor="textlight"
          type="submit"
          className={signUpFormStyle.button}
        >
          {text.signUpForm.button}
        </Theme_Button>
      </form>
    </motion.div>
  );
};

export default SignUpForm;
