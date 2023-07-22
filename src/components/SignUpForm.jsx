import Swal from "sweetalert2";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../utils/firebase";

const SignUpForm = () => {
  const navigate = useNavigate();

  const successSwal = () => {
    Swal.fire({
      icon: "success",
      title: "Your registration was successful.",
      text: "\nPlease activate your account by clicking\non the link sent to your email address.",
    });
  };

  const errorSwal = (error) => {
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
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

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      errorSwal("Passwords do not match.");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName }).then(() => {
        successSwal();
      });
      resetForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        errorSwal("Cannot create user, email already in use.");
      } else {
        errorSwal("Error during user creation.");
        console.log(error);
      }
    } finally {
      navigate("/shop");
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
        Sign Up
      </h1>
      <form className="flex flex-col items-start" onSubmit={handleSubmit}>
        <label className="flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1 mt-4">
          Username
        </label>
        <input
          required
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          className="text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
        />
        <label className="flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1 mt-4">
          Email address
        </label>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
        />
        <label className="flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1 mt-4">
          Password
        </label>
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
        />
        <label className="flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1 mt-4">
          Repeat Password
        </label>
        <input
          required
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          className="text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
        />
        <button
          type="submit"
          className="bg-logopink px-16 py-2 rounded-xl shadow-xl border-none hover:bg-pinkdark text-white font-[500] mx-auto block xs:mt-8 mt-4 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]"
        >
          Sign Up
        </button>
      </form>
    </motion.div>
  );
};

export default SignUpForm;
