import Swal from "sweetalert2";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
	signInWithGoogleRedirect,
	signInAuthUserWithEmailAndPassword,
} from "../utils/firebase";
import { signInFormStyle } from "../styles";

const SignInForm = () => {
	const navigate = useNavigate();

	const errorSwal = (error) => {
		Swal.fire({
			icon: "error",
			title: "Something went wrong!",
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

	const handleChange = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			resetForm();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					errorSwal("Incorrect password.");
					break;
				case "auth/user-not-found":
					errorSwal("User not found.");
					break;
				default:
					errorSwal("Error during sign in.");
					console.log(error);
					break;
			}
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			await signInWithGoogleRedirect();
		} catch (error) {
			errorSwal("Error during sign in.");
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
				Sign In
			</h1>
			<form className="flex flex-col items-start" onSubmit={handleSubmit}>
				<label className={signInFormStyle.label}>Email address</label>
				<input
					required
					type="email"
					name="email"
					value={email}
					onChange={handleChange}
					className={signInFormStyle.input}
				/>
				<label className={`${signInFormStyle.label} mt-4`}>Password</label>
				<input
					required
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					className={signInFormStyle.input}
				/>
				<button type="submit" className={signInFormStyle.button}>
					Sign In
				</button>
			</form>
			<button className="mt-2 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]">
				Forgot your password?
			</button>
			<button
				className={signInFormStyle.forgotButton}
				onClick={handleGoogleSignIn}
			>
				<Icon icon="devicon:google" className="mr-2" />
				Sign In with Google
			</button>
		</motion.div>
	);
};

export default SignInForm;
