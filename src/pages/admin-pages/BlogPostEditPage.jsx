import BlogWrapper from "../../utils/blogwrapper.hoc";
import { useContext } from "react";
import { BlogContext } from "../../context";
import { useParams } from "react-router-dom";
import { BlogForm } from "../../components";

const BlogPostEditPage = () => {
	const { id } = useParams();
	const [allBlogPost] = useContext(BlogContext);
	const post = allBlogPost.filter((post) => post.postid === id)[0];

	return (
		<div className="w-full h-full flex flex-col items-center px-8">
			<h1 className="text-text text-[1.5rem] font-[600] mb-8">Edit Article</h1>
			<BlogForm dbPost={post} />
		</div>
	);
};

export default BlogWrapper(BlogPostEditPage);
