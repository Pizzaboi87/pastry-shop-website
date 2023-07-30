import BlogWrapper from "../../utils/blogwrapper.hoc";
import { useContext } from "react";
import { BlogContext } from "../../context";
import { useParams } from "react-router-dom";
import { BlogForm } from "../../components";
import { otherText } from "../../constants";
import { adminPageStyle } from "../../styles";

const BlogPostEditPage = () => {
	const { id } = useParams();
	const [allBlogPost] = useContext(BlogContext);
	const post = allBlogPost.filter((post) => post.postid === id)[0];

	return (
		<div className={adminPageStyle.wrapper}>
			<h1 className={adminPageStyle.title}>{otherText.blogPostEditTitle}</h1>
			<BlogForm dbPost={post} />
		</div>
	);
};

export default BlogWrapper(BlogPostEditPage);
