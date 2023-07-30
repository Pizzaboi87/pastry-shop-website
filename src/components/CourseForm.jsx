import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { otherText } from "../constants";
import { courseFormStyle, phoneInputStyle } from "../styles";
import "react-phone-input-2/lib/bootstrap.css";

const CourseForm = ({ courses }) => {
	const defaultForm = {
		name: "",
		phone: "",
		email: "",
		course: "",
		question: "",
	};

	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState(defaultForm);
	const { name, phone, email, course, question } = form;

	const successSwal = () => {
		Swal.fire({
			icon: "success",
			title: otherText.courseForm.swal.successTitle,
			text: `${otherText.courseForm.swal.successTextStart} ${form.course} ${otherText.courseForm.swal.successTextEnd}`,
		});
	};

	const errorSwal = (error) => {
		Swal.fire({
			icon: "error",
			title: otherText.courseForm.swal.errorTitle,
			text: error,
		});
	};

	const valueCheck = (name, question) => {
		const nameRegex = /^[A-Za-z-/ñÑáÁéÉíÍóÓöÖőŐüÜűŰ\s]+$/;
		const questionRegex = /^[A-Za-z0-9,.\-;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐüÜűŰ\s]+$/;

		switch (true) {
			case !nameRegex.test(name):
				errorSwal(otherText.courseForm.swal.errorName);
				return;
			case !questionRegex.test(question):
				errorSwal(otherText.courseForm.swal.errorMessage);
				return;
			default:
				return true;
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const handlePhoneChange = (value) => {
		setForm({ ...form, phone: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!valueCheck(name, question)) return;
		else {
			setLoading(true);
			try {
				await emailjs.send(
					import.meta.env.VITE_SERVICE,
					import.meta.env.VITE_TEMPLATE,
					{
						name: name,
						email: email,
						phone: phone,
						course: course,
						question: question,
					},
					import.meta.env.VITE_KEY
				);
				successSwal();
				setLoading(false);
				setForm(defaultForm);
			} catch (error) {
				console.log(error.text);
				errorSwal(otherText.courseForm.swal.errorNotSent);
				setLoading(false);
			}
		}
	};

	return (
		<form
			className="col-span-2 md:py-8 md:px-8 py-4 px-1 rounded-xl shadow-xl bg-primary"
			onSubmit={handleSubmit}
		>
			<h1 className="md:text-4xl text-xl text-center text-text font-[500] mb-8">
				{otherText.courseForm.title}
			</h1>
			<label className={courseFormStyle.label}>
				{otherText.courseForm.name}
				<input
					required
					type="text"
					value={name}
					name="name"
					placeholder={otherText.courseForm.namePlaceholder}
					onChange={handleChange}
					className={courseFormStyle.input}
				/>
			</label>
			<label className={courseFormStyle.label}>
				{otherText.courseForm.phone}
				<PhoneInput
					required
					country={"hu"}
					value={phone}
					onChange={handlePhoneChange}
					inputStyle={phoneInputStyle}
				/>
			</label>
			<label className={courseFormStyle.label}>
				{otherText.courseForm.email}
				<input
					required
					type="email"
					value={email}
					name="email"
					placeholder={otherText.courseForm.emailPlaceholder}
					onChange={handleChange}
					className={courseFormStyle.input}
				/>
			</label>
			<label className={courseFormStyle.label}>
				{otherText.courseForm.course}
				<select
					required
					value={course}
					name="course"
					onChange={handleChange}
					className={courseFormStyle.input}
				>
					<option value="" disabled hidden>
						{otherText.courseForm.optionsTitle}
					</option>
					{courses.map((course) => (
						<option key={course.id} value={course.title}>
							{course.title}
						</option>
					))}
				</select>
			</label>
			<label className={courseFormStyle.label}>
				{otherText.courseForm.question}
				<textarea
					required
					value={question}
					name="question"
					onChange={handleChange}
					rows={5}
					className={courseFormStyle.input}
				/>
			</label>
			<button
				className={`${loading ? "cursor-progress" : "cursor-pointer"} ${
					courseFormStyle.button
				}`}
				type="submit"
				disabled={loading}
			>
				{loading ? otherText.courseForm.sending : otherText.courseForm.send}
			</button>
		</form>
	);
};

export default CourseForm;
