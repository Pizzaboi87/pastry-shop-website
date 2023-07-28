import { blogNewForm } from "../../styles";

const BlogNew = () => {
	return (
		<div className="w-full h-full flex flex-col items-center px-8">
			<h1 className="text-text text-[1.5rem] font-[600] mb-8">
				Add New Blog Post
			</h1>

			<form className="w-full grid grid-cols-4 gap-x-24 gap-y-8">
				<div className="col-span-2 flex flex-col justify-between">
					<label className={blogNewForm.label}>
						Post Title
						<input type="text" required className={blogNewForm.input} />
					</label>
					<label className={blogNewForm.label}>
						Author Name
						<input type="text" required className={blogNewForm.input} />
					</label>
					<label className={blogNewForm.label}>
						Post Background Image
						<input type="file" required className={blogNewForm.input} />
					</label>
					<label className={blogNewForm.label}>
						Post Blurb Text
						<textarea rows={5} required className={blogNewForm.input} />
					</label>
				</div>
				<div className="col-span-2 flex flex-col justify-between gap-y-4">
					<label className={blogNewForm.label}>
						Full Post Text
						<textarea rows={15} required className={blogNewForm.input} />
					</label>
					<label className={blogNewForm.label}>
						Hashtags
						<input type="text" required className={blogNewForm.input} />
					</label>
				</div>
				<button type="submit" className={blogNewForm.button}>
					Upload
				</button>
			</form>
		</div>
	);
};

export default BlogNew;
