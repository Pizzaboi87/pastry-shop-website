import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { course1, course2, course3 } from "../assets";
import { phoneInputStyle } from "../styles";
import "react-phone-input-2/lib/bootstrap.css";

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
			title: "Success!",
			text: `Thank you for your interest in our ${form.course} course. We will contact you soon!`,
		});
	};

	const errorSwal = (error) => {
		Swal.fire({
			icon: "error",
			title: "Something went wrong!",
			text: error,
		});
	};

	const valueCheck = (form) => {
		const nameRegex = /^[A-Za-z-/ñÑáÁéÉíÍóÓöÖőŐüÜűŰ\s]+$/;
		const questionRegex = /^[A-Za-z0-9,.\-;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐüÜűŰ\s]+$/;

		if (!nameRegex.test(form.name)) {
			errorSwal("Please enter a valid name.");
			return;
		}

		if (!questionRegex.test(form.question)) {
			errorSwal("Please enter a valid message.");
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
				errorSwal("Your message hasn't been sent, please try again later.");
				setLoading(false);
			}
		}
	};

	return (
		<div className="w-full grid grid-cols-3 self-center mt-16 pb-16 px-24 gap-24 justify-center">
			<div className="flex flex-col gap-4 self-center">
				<img src={course1} alt="course_1" />
				<img src={course2} alt="course_2" />
				<img src={course3} alt="course_3" />
			</div>
			<form
				className="col-span-2 p-8 rounded-xl shadow-xl bg-pinklight"
				onSubmit={handleSubmit}
			>
				<h1 className="text-4xl text-center text-text font-[500] mb-8">
					Contact Us
				</h1>
				<label className="flex flex-col text-text text-[1.2rem] font-[500] p-4">
					*Your name:
					<input
						required
						type="text"
						value={form.name}
						name="name"
						placeholder="Enter your name"
						onChange={handleChange}
						className="text-text text-[1.2rem] font-[400] py-2 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
					/>
				</label>
				<label className="flex flex-col text-text text-[1.2rem] font-[500] p-4">
					*Your phone number:
					<PhoneInput
						required
						country={"hu"}
						value={form.phone}
						onChange={handlePhoneChange}
						inputStyle={phoneInputStyle}
					/>
				</label>
				<label className="flex flex-col text-text text-[1.2rem] font-[500] p-4">
					*Your email address:
					<input
						required
						type="email"
						value={form.email}
						name="email"
						placeholder="Enter your email address"
						onChange={handleChange}
						className="text-text text-[1.2rem] font-[400] py-2 px-4 rounded-xl outline-none outline-dotted outline-logopink"
					/>
				</label>
				<label className="flex flex-col text-text text-[1.2rem] font-[500] p-4">
					*Which course are you interested in:
					<select
						required
						value={form.course}
						name="course"
						onChange={handleChange}
						className="text-text text-[1.2rem] font-[400] py-2 px-4 rounded-xl outline-none outline-dotted outline-logopink"
					>
						<option value="" disabled hidden>
							Choose from our courses
						</option>
						{courses.map((course) => (
							<option key={course.id} value={course.title}>
								{course.title}
							</option>
						))}
					</select>
				</label>
				<label className="flex flex-col text-text text-[1.2rem] font-[500] p-4">
					*Do you have any questions?
					<textarea
						required
						value={form.question}
						name="question"
						onChange={handleChange}
						rows={5}
						className="text-text text-[1.2rem] font-[400] py-2 px-4 rounded-xl outline-none outline-dotted outline-logopink"
					/>
				</label>
				<button
					className={`${
						loading ? "cursor-progress" : "cursor-pointer"
					} bg-logopink px-16 py-2 rounded-[15px] shadow-xl border-none hover:bg-pinkdark text-white text-[1rem] font-[500] mx-auto block`}
					type="submit"
					disabled={loading}
				>
					{loading ? "Sending..." : "Send"}
				</button>
			</form>
		</div>
	);
};

export default CourseForm;
