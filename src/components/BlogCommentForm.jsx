import { useState, useContext, useEffect } from "react";
import { blogCommentStyle } from "../styles";
import { UserContext } from "../context";
import { showName } from "../utils/firebase";

const BlogCommentForm = () => {
	const defaultForm = {
		author: displayName ? displayName : "",
		title: "",
		comment: "",
	};

	const [form, setForm] = useState(defaultForm);
	const { currentUser } = useContext(UserContext);
	const [displayName, setDisplayName] = useState("");
	const { author, title, comment } = form;

	useEffect(() => {
		const getName = async () => {
			const userName = await showName(currentUser.uid);
			setDisplayName(userName);
			setForm({ ...form, author: userName });
		};

		if (!currentUser) return;
		getName();
	}, [currentUser]);

	const resetForm = () => {
		setForm(defaultForm);
	};

	const handleChange = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	return (
		<form className="flex flex-col mt-4">
			<textarea
				required
				name="comment"
				value={comment}
				onChange={handleChange}
				placeholder="What do you think about it?"
				rows={5}
				className={blogCommentStyle.textarea}
			/>
			<span className="flex w-full justify-evenly items-end">
				<label className={blogCommentStyle.label}>
					{otherText.blogCommentForm.name}
					<input
						required
						disabled={currentUser ? true : false}
						type="text"
						name="author"
						value={author}
						onChange={handleChange}
						className={blogCommentStyle.input}
					/>
				</label>
				<label className={blogCommentStyle.label}>
					{otherText.blogCommentForm.title}
					<input
						required
						type="text"
						name="title"
						value={title}
						onChange={handleChange}
						className={blogCommentStyle.input}
					/>
				</label>

				<button type="submit" className={blogCommentStyle.button}>
					{otherText.blogCommentForm.button}
				</button>
			</span>
		</form>
	);
};

export default BlogCommentForm;
