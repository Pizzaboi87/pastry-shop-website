import { BlogForm } from "../../components";
import { otherText } from "../../constants";
import { adminPageStyle } from "../../styles";

const BlogNew = () => {
	return (
		<div className={adminPageStyle.wrapper}>
			<h1 className={adminPageStyle.title}>{otherText.blogNewTitle}</h1>
			<BlogForm />
		</div>
	);
};

export default BlogNew;
