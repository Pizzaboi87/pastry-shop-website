import { useState } from "react";
import { courses } from "../constants";
import { course1, course2, course3 } from "../assets";

const CourseForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    question: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="w-full flex justify-center items-center self-center mt-16 pb-16">
      <div className="flex flex-col gap-4 items-center">
        <img src={course1} alt="course_1" className="w-[80%]" />
        <img src={course2} alt="course_2" className="w-[80%]" />
        <img src={course3} alt="course_3" className="w-[80%]" />
      </div>
      <form className="flex flex-col w-full p-8 rounded-xl shadow-xl bg-pinklight">
        <h1 className="text-4xl text-center text-text font-[500] mb-8">
          Contact Us
        </h1>
        <label className="flex flex-col text-text text-[1.2rem] font-[500] p-4">
          Your name:
          <input
            type="text"
            value={form.name}
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            className="text-text text-[1.2rem] font-[400] py-2 px-4 rounded-xl outline-none"
          />
        </label>
        <label className="flex flex-col text-text text-[1.2rem] font-[500] p-4">
          Your phone number:
          <input
            type="phone"
            value={form.phone}
            name="phone"
            placeholder="Enter your phone number"
            onChange={handleChange}
            className="text-text text-[1.2rem] font-[400] py-2 px-4 rounded-xl outline-none"
          />
        </label>
        <label className="flex flex-col text-text text-[1.2rem] font-[500] p-4">
          Your email address:
          <input
            type="email"
            value={form.email}
            name="email"
            placeholder="Enter your email address"
            onChange={handleChange}
            className="text-text text-[1.2rem] font-[400] py-2 px-4 rounded-xl outline-none"
          />
        </label>
        <label className="flex flex-col text-text text-[1.2rem] font-[500] p-4">
          Which course are you interested in:
          <select
            value={form.course}
            name="course"
            onChange={handleChange}
            className="text-text text-[1.2rem] font-[400] py-2 px-4 rounded-xl outline-none"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-text text-[1.2rem] font-[500] p-4">
          Do you have any questions?
          <textarea
            value={form.question}
            name="question"
            onChange={handleChange}
            rows={5}
            className="text-text text-[1.2rem] font-[400] py-2 px-4 rounded-xl outline-none"
          />
        </label>
        <button
          className="bg-logopink px-16 py-2 rounded-[15px] shadow-xl border-none hover:bg-pinkdark text-white text-[1rem] font-[500] self-center justify-self-center]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
