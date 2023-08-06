import Swal from "sweetalert2";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Theme_Button, Theme_Input, signInFormStyle } from "../styles";
import { otherText } from "../constants";
import {
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
} from "../utils/firebase";

const SignInForm = () => {
  const navigate = useNavigate();

  const errorSwal = (error) => {
    Swal.fire({
      icon: "error",
      title: otherText.signInForm.swal.errorTitle,
      text: error,
    });
  };

  const defaultForm = {
    email: "",
    password: "",
  };

  const resetForm = () => {
    setForm(defaultForm);
  };

  const [form, setForm] = useState(defaultForm);
  const { email, password } = form;

  const valueCheck = (email, password) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex =
      /^[A-Za-z0-9,.\-_;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;

    switch (true) {
      case !emailRegex.test(email):
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!valueCheck(email, password)) return;
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
            errorSwal(otherText.signInForm.swal.errorPassword);
            break;
          case "auth/user-not-found":
            errorSwal(otherText.signInForm.swal.errorUser);
            break;
          default:
            errorSwal(otherText.signInForm.swal.errorOther);
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
      errorSwal(otherText.signInForm.swal.errorOther);
      console.log(error);
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
        {otherText.signInForm.title}
      </h1>

      <form className="flex flex-col items-start" onSubmit={handleSubmit}>
        <label className={signInFormStyle.label}>
          {otherText.signInForm.email}
          <Theme_Input
            required
            type="email"
            name="email"
            value={email}
            $outline="logo"
            onChange={handleChange}
            className={signInFormStyle.input}
          />
        </label>

        <label className={`${signInFormStyle.label} mt-4`}>
          {otherText.signInForm.password}
          <Theme_Input
            required
            type="password"
            name="password"
            value={password}
            $outline="logo"
            onChange={handleChange}
            className={signInFormStyle.input}
          />
        </label>

        <Theme_Button
          type="submit"
          $bg="logo"
          $hover="dark"
          $textcolor="textlight"
          className={signInFormStyle.button}
        >
          {otherText.signInForm.button}
        </Theme_Button>
      </form>

      <button className="mt-2 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]">
        {otherText.signInForm.forgot}
      </button>

      <Theme_Button
        $border="logo"
        className={signInFormStyle.forgotButton}
        onClick={handleGoogleSignIn}
      >
        <Icon icon="devicon:google" className="mr-2" />
        {otherText.signInForm.google}
      </Theme_Button>
    </motion.div>
  );
};

export default SignInForm;
