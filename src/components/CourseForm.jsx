import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import emailjs from "@emailjs/browser";
import { useState, useContext } from "react";
import { UserContext } from "../context";
import {
  Theme_Button,
  Theme_Form,
  courseFormStyle,
  phoneInputStyle,
} from "../styles";
import "react-phone-input-2/lib/bootstrap.css";

const CourseForm = ({ courses }) => {
  const { text } = useContext(UserContext);

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
      title: text.courseForm.swal.successTitle,
      text: `${text.courseForm.swal.successTextStart} ${form.course} ${text.courseForm.swal.successTextEnd}`,
    });
  };

  const valueCheck = (name, question) => {
    const nameRegex = /^[-\p{L}\s]+$/u;
    const questionRegex = /^[0-9A-Za-z,.\-;:?!()%"@$/€\p{L}\n\s]+$/u;

    switch (true) {
      case !nameRegex.test(name):
        errorSwal(text.courseForm.swal.errorName, text);
        return;
      case !questionRegex.test(question):
        errorSwal(text.courseForm.swal.errorMessage, text);
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
        errorSwal(text.courseForm.swal.errorNotSent, text);
        setLoading(false);
      }
    }
  };

  const inputStyle = {
    ...phoneInputStyle,
    height: window.innerWidth < 500 ? "2.5rem" : "3rem",
  };

  return (
    <Theme_Form
      $bgcolor="primary"
      className="col-span-2 md:py-8 md:px-8 py-4 px-1 rounded-xl shadow-xl"
      onSubmit={handleSubmit}
    >
      <h1 className="md:text-4xl text-xl text-center text-text font-[500] mb-8">
        {text.courseForm.title}
      </h1>
      <label className={courseFormStyle.label}>
        {text.courseForm.name}
        <input
          required
          type="text"
          value={name}
          name="name"
          placeholder={text.courseForm.namePlaceholder}
          onChange={handleChange}
          className={courseFormStyle.input}
        />
      </label>
      <label className={courseFormStyle.label}>
        {text.courseForm.phone}
        <PhoneInput
          required
          country={"hu"}
          value={phone}
          onChange={handlePhoneChange}
          inputStyle={inputStyle}
        />
      </label>
      <label className={courseFormStyle.label}>
        {text.courseForm.email}
        <input
          required
          type="email"
          value={email}
          name="email"
          placeholder={text.courseForm.emailPlaceholder}
          onChange={handleChange}
          className={courseFormStyle.input}
        />
      </label>
      <label className={courseFormStyle.label}>
        {text.courseForm.course}
        <select
          required
          value={course}
          name="course"
          onChange={handleChange}
          className={courseFormStyle.input}
        >
          <option value="" disabled hidden>
            {text.courseForm.optionsTitle}
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.title}>
              {course.title}
            </option>
          ))}
        </select>
      </label>
      <label className={courseFormStyle.label}>
        {text.courseForm.question}
        <textarea
          required
          value={question}
          name="question"
          onChange={handleChange}
          rows={5}
          className={courseFormStyle.input}
        />
      </label>
      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className={`${loading ? "cursor-progress" : "cursor-pointer"} ${
          courseFormStyle.button
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? text.courseForm.sending : text.courseForm.send}
      </Theme_Button>
    </Theme_Form>
  );
};

export default CourseForm;
