import Swal from "sweetalert2";
import { otherText } from "../constants";
import { useState, useContext, useEffect } from "react";
import { blogCommentStyle } from "../styles";
import { UserContext } from "../context";
import { showName } from "../utils/firebase";

const BlogCommentForm = () => {
	const [displayName, setDisplayName] = useState("");
	const defaultForm = {
		author: displayName ? displayName : "",
		title: "",
		comment: "",
	};

	const [form, setForm] = useState(defaultForm);
	const { currentUser } = useContext(UserContext);
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

	const valueCheck = (author, title, comment) => {
		const nameRegex = /^[A-Za-z-/ñÑáÁéÉíÍóÓöÖőŐüÜűŰ\s]+$/;
		const commentRegex = /^[A-Za-z0-9,.\-;:?!()%"@$/€ñÑáÁéÉíÍóÓöÖőŐüÜűŰ\s]+$/;

		if (!nameRegex.test(author)) {
			errorSwal(otherText.blogCommentForm.swal.errorName);
			return;
		}

		if (!commentRegex.test(title)) {
			errorSwal(otherText.blogCommentForm.swal.errorCommentTitle);
			return;
		}

		if (!commentRegex.test(comment)) {
			errorSwal(otherText.blogCommentForm.swal.errorComment);
			return;
		} else return true;
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (event) => {
		event.prefentDefault();
		valueCheck(author, title, comment);
		//NOT READY
	};

	return (
		<form className="flex flex-col mt-4">
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
