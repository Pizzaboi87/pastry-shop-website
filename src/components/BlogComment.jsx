import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context";
import { comments } from "../content";
import { showName } from "../utils/firebase";
import { blogCommentStyle } from "../styles";
import { otherText } from "../constants";

const BlogComment = ({ id }) => {
	const { currentUser } = useContext(UserContext);
	const [displayName, setDisplayName] = useState("");

	const defaultForm = {
		author: displayName ? displayName : "",
		title: "",
		comment: "",
	};

	const [form, setForm] = useState(defaultForm);
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

	const allComment = comments
		.filter((comment) => comment.relatedID === id)
		.map((comment, index) => (
			<div className="flex flex-col my-8" key={index}>
				<span className="w-full flex justify-between">
					<p className="tex-text font-[600]">{comment.author}</p>
					<p>{new Date(comment.date).toUTCString().slice(0, -7)}</p>
				</span>
				<p className="text-text text-[1.2rem] decoration-double underline">
					{comment.title}
				</p>
				<p>{comment.comment}</p>
			</div>
		));

	return (
		<div className="col-span-4 mb-16">
			<div className="w-full bg-primary rounded-2xl shadow-xl p-6 mb-16">
				<h1 className="text-text text-[1.3rem] font-[600] mb-16">
					{otherText.blogCommentTitle}
				</h1>
				<ul>{allComment}</ul>
			</div>
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
		</div>
	);
};

export default BlogComment;
