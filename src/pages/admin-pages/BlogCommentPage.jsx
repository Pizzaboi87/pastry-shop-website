import { adminPageStyle, blogNewFormStyle } from "../../styles";
import { useParams } from "react-router-dom";
import { comments } from "../../content";
import { useState } from "react";
import { Icon } from "@iconify/react";

const BlogCommentPage = () => {
	const { commentID } = useParams();
	const actualComment = comments.filter(
		(comment) => comment.id === commentID
	)[0];
	console.log(actualComment);

	const defaultForm = {
		author: actualComment.author,
		email: actualComment.email,
		comment: actualComment.comment,
		date: new Date(actualComment.date).toUTCString(),
		id: actualComment.id,
		isPublished: actualComment.isPublished,
		relatedID: actualComment.relatedID,
		title: actualComment.title,
	};

	const [commentForm, setCommentForm] = useState(defaultForm);
	const { author, email, id, date, title, comment, isPublished, relatedID } =
		commentForm;

	const handleChange = () => {};

	const handleSubmit = () => {};

	return (
		<div className={`${adminPageStyle.wrapper} relative`}>
			<h1 className={adminPageStyle.title}>Comment Page</h1>

			{isPublished ? (
				<Icon
					icon="mdi:publish"
					className="published outline-none text-green text-[4rem] cursor-pointer absolute top-[1rem] right-[1rem]"
				/>
			) : (
				<Icon
					icon="mdi:publish-off"
					className="hided outline-none text-red text-[4rem] cursor-pointer absolute top-[1rem] right-[1rem]"
				/>
			)}

			<form className="w-full grid grid-cols-4 gap-y-8 gap-x-16">
				<label className={`${blogNewFormStyle.label} col-span-2`}>
					Comment ID
					<input
						disabled
						type="text"
						name="id"
						value={id}
						className={blogNewFormStyle.input}
					/>
				</label>

				<label className={`${blogNewFormStyle.label} col-span-2`}>
					Creation Date
					<input
						disabled
						type="text"
						name="date"
						value={date}
						className={blogNewFormStyle.input}
					/>
				</label>

				<label className={`${blogNewFormStyle.label} col-span-2`}>
					Author Name
					<input
						disabled
						type="text"
						name="author"
						value={author}
						className={blogNewFormStyle.input}
					/>
				</label>

				<label className={`${blogNewFormStyle.label} col-span-2`}>
					Author Email
					<input
						disabled
						type="text"
						name="email"
						value={email}
						className={blogNewFormStyle.input}
					/>
				</label>

				<span className="col-span-2 flex flex-col gap-8">
					<label className={blogNewFormStyle.label}>
						Comment Title
						<input
							disabled
							type="text"
							name="title"
							value={title}
							className={blogNewFormStyle.input}
						/>
					</label>

					<label className={blogNewFormStyle.label}>
						Related-Post
						<input
							disabled
							type="text"
							name="relatedID"
							value={relatedID}
							className={blogNewFormStyle.input}
						/>
					</label>
				</span>

				<label className={`${blogNewFormStyle.label} col-span-2`}>
					Comment Text
					<textarea
						disabled
						rows={5}
						name="comment"
						value={comment}
						className={blogNewFormStyle.input}
					/>
				</label>
			</form>
		</div>
	);
};

export default BlogCommentPage;

/*
<Icon
								icon="bi:trash3-fill"
								className="delete text-text text-[2rem] hover:text-logopink cursor-pointer"
							/>
							<Link
								to={`/admin/blog/comments/${comment.id}`}
								className="edit text-text text-[2rem] hover:text-logopink cursor-pointer"
							>
								<Icon icon="raphael:edit" />
							</Link>
							{comment.isPublished ? (
								<Icon
									icon="mdi:publish"
									className="publish outline-none text-green text-[2rem] cursor-pointer"
								/>
							) : (
								<Icon
									icon="mdi:publish-off"
									className="hide outline-none text-red text-[2rem] cursor-pointer"
								/>
							)}
*/
