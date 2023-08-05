import Swal from "sweetalert2";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Theme_Button, signUpFormStyle } from "../styles";
import { otherText } from "../constants";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  auth,
} from "../utils/firebase";

const SignUpForm = () => {
  const navigate = useNavigate();

  const successSwal = () => {
    Swal.fire({
      icon: "success",
      title: otherText.signUpForm.swal.successTitle,
      text: otherText.signUpForm.swal.successText,
    });
  };

  const errorSwal = (error) => {
    Swal.fire({
      icon: "error",
      title: otherText.signUpForm.swal.errorTitle,
      text: error,
    });
  };

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

  const valueCheck = (displayName, email, password, confirmPassword) => {
    const nameRegex = /^[A-Za-z0-9-/ñÑáÁéÉíÍóÓöÖőŐúÚüÜűŰ\s]+$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex =
      /^[A-Za-z0-9,.\-_;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőúÚŐüÜűŰ\s]{8,}$/;

    switch (true) {
      case !nameRegex.test(displayName):
        errorSwal(otherText.signUpForm.swal.errorName);
        return;
      case password !== confirmPassword:
        errorSwal(otherText.signUpForm.swal.errorPasswordMatch);
        return;
      case !emailRegex.test(email):
        errorSwal(otherText.signUpForm.swal.errorEmail);
        return;
      case !passwordRegex.test(password):
        errorSwal(otherText.signUpForm.swal.errorPassword);
        return;
      case !passwordRegex.test(password):
        errorSwal(otherText.signUpForm.swal.errorPassword);
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

    if (!valueCheck(displayName, email, password, confirmPassword)) return;
    else {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );

        await createUserDocumentFromAuth(user, { displayName }).then(() => {
          successSwal();
        });
        resetForm();
        auth.signOut();
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          errorSwal(otherText.signUpForm.swal.errorInUse);
        } else {
          errorSwal(otherText.signUpForm.swal.errorOther);
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
        {otherText.signUpForm.title}
      </h1>
      <form className="flex flex-col items-start" onSubmit={handleSubmit}>
        <label className={signUpFormStyle.label}>
          {otherText.signUpForm.userName}
          <input
            required
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            className={signUpFormStyle.input}
          />
        </label>

        <label className={signUpFormStyle.label}>
          {otherText.signUpForm.email}
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={signUpFormStyle.input}
          />
        </label>

        <label className={signUpFormStyle.label}>
          {otherText.signUpForm.password}
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={signUpFormStyle.input}
          />
        </label>

        <label className={signUpFormStyle.label}>
          {otherText.signUpForm.confirmPassword}
          <input
            required
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className={signUpFormStyle.input}
          />
        </label>

        <Theme_Button
          $bg="logo"
          $hover="dark"
          $text="textlight"
          type="submit"
          className={signUpFormStyle.button}
        >
          {otherText.signUpForm.button}
        </Theme_Button>
      </form>
    </motion.div>
  );
};

export default SignUpForm;
