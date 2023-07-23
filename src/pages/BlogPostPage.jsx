import {
	BlogPostCard,
	BlogCarousel,
	BlogStickyCard,
	BlogComment,
} from "../components";
import { useParams } from "react-router-dom";
import { dummyPosts } from "../content";

const BlogPostPage = () => {
	const { id } = useParams();
	let post = dummyPosts.filter((post) => post.id === id)[0];

	return (
		<div className="glass grid grid-cols-4 md:mt-56 mt-36 xl:w-[90%] 3xl:w-[80%] w-full bg-glass rounded-xl md:p-12 p-4 gap-x-12 shadow-2xl">
			<h1 className="col-span-4 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
				{post.title}
			</h1>

			<div className="xl:col-span-3 col-span-4 ">
				<BlogPostCard key={post.id} post={post} isOwnPage={true} />
			</div>

			<BlogStickyCard posts={dummyPosts} />

			<BlogComment />

		</div>
	);
};

export default BlogPostPage;
