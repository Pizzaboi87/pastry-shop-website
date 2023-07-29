import Swal from "sweetalert2";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signUpFormStyle } from "../styles";
import { otherText } from "../constants";
import {
	createUserDocumentFromAuth,
	createAuthUserWithEmailAndPassword,
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

	const handleChange = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			errorSwal(otherText.signUpForm.swal.errorPassword);
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
				errorSwal(otherText.signUpForm.swal.errorInUse);
			} else {
				errorSwal(otherText.signUpForm.swal.errorOther);
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
				{otherText.signUpForm.title}
			</h1>
			<form className="flex flex-col items-start" onSubmit={handleSubmit}>
				<label className={signUpFormStyle.label}>
					{otherText.signUpForm.userName}
				</label>
				<input
					required
					type="text"
					name="displayName"
					value={displayName}
					onChange={handleChange}
					className={signUpFormStyle.input}
				/>
				<label className={signUpFormStyle.label}>
					{otherText.signUpForm.email}
				</label>
				<input
					required
					type="email"
					name="email"
					value={email}
					onChange={handleChange}
					className={signUpFormStyle.input}
				/>
				<label className={signUpFormStyle.label}>
					{otherText.signUpForm.password}
				</label>
				<input
					required
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					className={signUpFormStyle.input}
				/>
				<label className={signUpFormStyle.label}>
					{otherText.signUpForm.confirmPassword}
				</label>
				<input
					required
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					className={signUpFormStyle.input}
				/>
				<button type="submit" className={signUpFormStyle.button}>
					{otherText.signUpForm.button}
				</button>
			</form>
		</motion.div>
	);
};

export default SignUpForm;
