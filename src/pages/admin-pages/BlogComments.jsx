import { otherText } from "../../constants";

const BlogComments = () => {
	return (
		<div className="w-full h-full flex flex-col items-center">
			<h1 className="text-text text-[1.5rem] font-[600] mb-8">
				{otherText.blogCommentsTitle}
			</h1>
		</div>
	);
};

export default BlogComments;
