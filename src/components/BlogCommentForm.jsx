import Swal from "sweetalert2";
import { otherText } from "../constants";
import { useState, useEffect, useContext } from "react";
import { blogCommentStyle } from "../styles";
import { showName } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../context";

const BlogCommentForm = ({ postID }) => {
	const { currentUser } = useContext(UserContext);
	const [displayName, setDisplayName] = useState("");
	const defaultForm = {
		author: displayName,
		email: currentUser.email,
		title: "",
		comment: "",
		relatedID: postID,
		date: Date.now(),
		id: uuidv4(),
	};

	const [form, setForm] = useState(defaultForm);
	const { author, email, title, comment } = form;

	useEffect(() => {
		const getName = async () => {
			const userName = await showName(currentUser.uid);
			setDisplayName(userName);
			setForm({ ...form, author: userName });
		};

		if (!currentUser) return;
		getName();
	}, [currentUser]);

	const successSwal = () => {
		Swal.fire({
			icon: "success",
			title: otherText.blogCommentForm.swal.successTitle,
			text: otherText.blogCommentForm.swal.successMessage,
		});
	};

	const errorSwal = (error) => {
		Swal.fire({
			icon: "error",
			title: otherText.blogCommentForm.swal.errorTitle,
			text: error,
		});
	};

	const valueCheck = (title, comment) => {
		const commentRegex = /^[A-Za-z0-9,.\-;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐüÜűŰ\s]+$/;

		switch (true) {
			case !commentRegex.test(title):
				errorSwal(otherText.blogCommentForm.swal.errorCommentTitle);
				return;
			case !commentRegex.test(comment):
				errorSwal(otherText.blogCommentForm.swal.errorComment);
				return;
			default:
				return true;
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	//------------------------------------------------------NOT READY: Send comment function missing.------------------------------------------------------
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!valueCheck(title, comment)) return;
		else {
			console.log("BlogCommentForm: ", form);
			successSwal();
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col mt-4">
			<textarea
				required
				name="comment"
				value={comment}
				onChange={handleChange}
				placeholder={otherText.blogCommentForm.commentPlaceholder}
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
