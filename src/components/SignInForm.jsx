import { UserContext } from "../context";
import { Icon } from "@iconify/react";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useValidation } from "../utils/useValidation";
import { Theme_Button, Theme_Input, signInFormStyle } from "../styles";
import {
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
} from "../utils/firebase";

const SignInForm = () => {
  const { text } = useContext(UserContext);
  const { showErrorSwal } = useSwalMessage();

  const defaultForm = {
    email: "",
    password: "",
  };

  const resetForm = () => {
    setForm(defaultForm);
  };

  const [form, setForm] = useState(defaultForm);
  const { email, password } = form;

  const validationRules = {
    email: {
      value: email,
      regex: "email",
      errorMessage: text.signInForm.swal.errorEmail,
    },
    password: {
      value: password,
      regex: "password",
      errorMessage: text.signInForm.swal.errorPassword,
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
    else {
      try {
        const { user } = await signInAuthUserWithEmailAndPassword(
          email,
          password
        );
        resetForm();
      } catch (error) {
        switch (error.code) {
          case "auth/wrong-password":
            showErrorSwal(text.signInForm.swal.errorPassword);
            break;
          case "auth/user-not-found":
            showErrorSwal(text.signInForm.swal.errorUser);
            break;
          default:
            showErrorSwal(text.signInForm.swal.errorOther);
            console.log(error);
            break;
        }
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogleRedirect();
    } catch (error) {
      showErrorSwal(text.signInForm.swal.errorOther);
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, maxHeight: 0 }}
      animate={{ opacity: 1, maxHeight: "75vh" }}
      exit={{ opacity: 0, maxHeight: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={signInFormStyle.wrapper}
    >
      <h1 className={signInFormStyle.title}>{text.signInForm.title}</h1>

      <form className={signInFormStyle.form} onSubmit={handleSubmit}>
        <label className={signInFormStyle.label}>
          {text.signInForm.email}
          <Theme_Input
            required
            type="email"
            name="email"
            value={email}
            $outlinecolor="logo"
            onChange={handleChange}
            className={signInFormStyle.input}
          />
        </label>

        <label className={signInFormStyle.labelMt}>
          {text.signInForm.password}
          <Theme_Input
            required
            type="password"
            name="password"
            value={password}
            $outlinecolor="logo"
            onChange={handleChange}
            className={signInFormStyle.input}
          />
        </label>

        <Theme_Button
          type="submit"
          $bgcolor="logo"
          $textcolor="textlight"
          $bordercolor="transparent"
          $hoverbgcolor="dark"
          $hovertextcolor="textlight"
          className={signInFormStyle.button}
        >
          {text.signInForm.button}
        </Theme_Button>
      </form>

      <button className={signInFormStyle.forgotButton}>
        {text.signInForm.forgot}
      </button>

      <Theme_Button
        $bgcolor="transparent"
        $textcolor="text"
        $bordercolor="logo"
        $hoverbgcolor="transparent"
        $hovertextcolor="text"
        className={signInFormStyle.googleButton}
        onClick={handleGoogleSignIn}
      >
        <Icon icon="devicon:google" className={signInFormStyle.icon} />
        {text.signInForm.google}
      </Theme_Button>
    </motion.div>
  );
};

export default SignInForm;
