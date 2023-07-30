import { otherText } from "../../constants";
import { comments } from "../../content";
import { adminPageStyle } from "../../styles";

const BlogComments = () => {
	return (
		<div className={adminPageStyle.wrapper}>
			<h1 className={adminPageStyle.title}>{otherText.blogCommentsTitle}</h1>

			
		</div>
	);
};

export default BlogComments;
