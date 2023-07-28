import { BlogForm } from "../../components";

const BlogNew = () => {
	return (
		<div className="w-full h-full flex flex-col items-center px-8">
			<h1 className="text-text text-[1.5rem] font-[600] mb-8">
				Add New Article
			</h1>
			<BlogForm />
		</div>
	);
};

export default BlogNew;
