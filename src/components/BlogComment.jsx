import { useState } from "react";

const BlogComment = () => {
	const defaultForm = {
		author: "",
		title: "",
		comment: "",
	};

	const resetForm = () => {
		setForm(defaultForm);
	};

	const [form, setForm] = useState(defaultForm);
	const { author, title, comment } = form;

	const handleChange = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	return (
		<div className="col-span-3 mb-16">
			<div className="w-full bg-primary rounded-2xl shadow-xl p-6 mb-16">
				<h1 className="text-text text-[1.3rem] font-[600] mb-16">Comments</h1>
			</div>
			<form className="flex flex-col mt-4">
				<textarea
					required
					name="comment"
					value={comment}
					onChange={handleChange}
					placeholder="What do you think about it?"
					rows={5}
					className="bg-white rounded-2xl shadow-xl p-6 w-full text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] outline-none  outline-dotted outline-logopink mb-4"
				/>
				<span className="flex w-full justify-evenly items-end">
					<label className="w-[30%] flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1">
						Your Name
						<input
							required
							type="text"
							name="author"
							value={author}
							onChange={handleChange}
							className="w-full text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-3 rounded-xl outline-none  outline-dotted outline-logopink"
						/>
					</label>
					<label className="w-[30%] flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1">
						Title of your comment
						<input
							required
							type="text"
							name="title"
							value={title}
							onChange={handleChange}
							className="w-full text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-3 rounded-xl outline-none  outline-dotted outline-logopink"
						/>
					</label>

					<button
						type="submit"
						className="bg-logopink px-16 py-2 rounded-xl shadow-xl border-none hover:bg-pinkdark text-white font-[500] block xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]"
					>
						Submit
					</button>
				</span>
			</form>
		</div>
	);
};

export default BlogComment;
