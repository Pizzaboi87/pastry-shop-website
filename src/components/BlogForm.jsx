import { memo, useState } from "react";
import { blogNewForm } from "../styles";

const BlogForm = ({ dbPost }) => {
	const defaultForm = {
		author: dbPost ? dbPost.author : "",
		title: dbPost ? dbPost.title : "",
		blurb: dbPost ? dbPost.blurb : "",
		post: dbPost ? dbPost.post : "",
		date: dbPost ? dbPost.date : "",
		postid: dbPost ? dbPost.postid : "",
		tags: dbPost ? dbPost.tags.slice(",").join(", ") : [],
		image: {},
	};

	const [blogForm, setBlogForm] = useState(defaultForm);
	const { author, title, blurb, post, date, image, postid, tags } = blogForm;

	const handleChange = (event) => {
		const { name, value, files } = event.target;

		if (name === "image") {
			setBlogForm({ ...blogForm, image: files[0] });
		} else if (name === "title") {
			setBlogForm({
				...blogForm,
				title: value,
				postid: value.toLowerCase().split(" ").join("-"),
			});
		} else {
			setBlogForm({ ...blogForm, [name]: value });
		}
	};

	return (
		<form className="w-full grid grid-cols-4 gap-x-24 gap-y-8">
			<div className="col-span-2 flex flex-col justify-between">
				<label className={blogNewForm.label}>
					Post Date
					<input
						type="text"
						required
						name="date"
						value={date}
						onChange={handleChange}
						className={blogNewForm.input}
					/>
				</label>

				<label className={blogNewForm.label}>
					Post Title
					<input
						type="text"
						required
						name="title"
						value={title}
						onChange={handleChange}
						className={blogNewForm.input}
					/>
				</label>
				<label className={blogNewForm.label}>
					Author Name
					<input
						type="text"
						required
						name="author"
						value={author}
						onChange={handleChange}
						className={blogNewForm.input}
					/>
				</label>
				<label className={blogNewForm.label}>
					{dbPost ? "New Post Image" : "Post Background Image"}
					<input
						type="file"
						required
						name="image"
						accept="image/*"
						onChange={handleChange}
						className={blogNewForm.input}
					/>
				</label>
				<label className={blogNewForm.label}>
					Post Blurb Text
					<textarea
						rows={5}
						required
						name="blurb"
						value={blurb}
						onChange={handleChange}
						className={blogNewForm.input}
					/>
				</label>
			</div>
			<div className="col-span-2 flex flex-col justify-between gap-y-4">
				<label className={blogNewForm.label}>
					Full Post Text
					<textarea
						rows={15}
						required
						name="post"
						value={post}
						onChange={handleChange}
						className={blogNewForm.input}
					/>
				</label>
				<label className={blogNewForm.label}>
					Hashtags
					<input
						type="text"
						required
						name="tags"
						value={tags}
						onChange={handleChange}
						className={blogNewForm.input}
					/>
				</label>
			</div>
			<button type="submit" className={blogNewForm.button}>
				Save
			</button>
		</form>
	);
};

export default memo(BlogForm);
