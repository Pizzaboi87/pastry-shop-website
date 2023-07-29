import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { course1, course2, course3 } from "../assets";
import { courseFormStyle, phoneInputStyle } from "../styles";
import "react-phone-input-2/lib/bootstrap.css";
import { otherText } from "../constants";

const CourseForm = ({ courses }) => {
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		name: "",
		phone: "",
		email: "",
		course: "",
		question: "",
	});

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

	const valueCheck = (form) => {
		const nameRegex = /^[A-Za-z-/ñÑáÁéÉíÍóÓöÖőŐüÜűŰ\s]+$/;
		const questionRegex = /^[A-Za-z0-9,.\-;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐüÜűŰ\s]+$/;

		if (!nameRegex.test(form.name)) {
			errorSwal(otherText.courseForm.swal.errorName);
			return;
		}

		if (!questionRegex.test(form.question)) {
			errorSwal(otherText.courseForm.swal.errorMessage);
			return;
		} else return true;
	};

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [name]: value });
	};

	const handlePhoneChange = (value) => {
		setForm((prevForm) => ({
			...prevForm,
			phone: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!valueCheck(form)) return;
		else {
			setLoading(true);
			try {
				await emailjs.send(
					import.meta.env.VITE_SERVICE,
					import.meta.env.VITE_TEMPLATE,
					{
						name: form.name,
						email: form.email,
						phone: form.phone,
						course: form.course,
						question: form.question,
					},
					import.meta.env.VITE_KEY
				);
				successSwal();
				setLoading(false);
				setForm({ name: "", phone: "", email: "", course: "", question: "" });
			} catch (error) {
				console.log(error.text);
				errorSwal(otherText.courseForm.swal.errorNotSent);
				setLoading(false);
			}
		}
	};

	return (
		<div className="w-full xl:grid xl:grid-cols-3 flex-col flex self-center mt-16 md:pb-16 pb-4 xl:px-16 2xl:px-0 md:gap-8 justify-between">
			<div className="w-full flex flex-col gap-4 self-center mb-8 md:mb-0">
				<img src={course1} alt="course_1" />
				<img src={course2} alt="course_2" />
				<img src={course3} alt="course_3" />
			</div>
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
						value={form.name}
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
						value={form.phone}
						onChange={handlePhoneChange}
						inputStyle={phoneInputStyle}
					/>
				</label>
				<label className={courseFormStyle.label}>
					{otherText.courseForm.email}
					<input
						required
						type="email"
						value={form.email}
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
						value={form.course}
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
						value={form.question}
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
		</div>
	);
};

export default CourseForm;
