import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../../context";
import {
	BlogPostCard,
	BlogStickyCard,
	BlogComment,
	TransitionParent,
} from "../../components";
import BlogWrapper from "../../utils/blogwrapper.hoc";

const BlogPostPage = () => {
	const { id } = useParams();
	const [allBlogPost, setAllBlogPost] = useContext(BlogContext);
	const post = allBlogPost.filter((post) => post.postid === id)[0];

	return (
		<TransitionParent isFlex={false}>
			<h1 className="col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
				{post.title}
			</h1>

			<div className="xl:col-span-4 col-span-6 ">
				<BlogPostCard key={post.id} post={post} isOwnPage={true} />
			</div>

			<BlogStickyCard posts={allBlogPost} />

			<BlogComment id={id} />
		</TransitionParent>
	);
};

export default BlogWrapper(BlogPostPage);
