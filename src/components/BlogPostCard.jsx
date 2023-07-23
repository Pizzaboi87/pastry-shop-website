import { Link } from "react-router-dom";

const BlogPostCard = ({ post, isOwnPage }) => {
	return (
		<div className="bg-primary w-full rounded-2xl mb-16 shadow-xl">
			<img
				src={post.image}
				alt="image"
				className="w-full h-[25rem] object-cover rounded-t-2xl"
			/>
			<div className="p-8 flex flex-col items-center justify-center">
				<h1 className="self-center mb-4 text-text text-[1.3rem] font-[600]">
					{post.title}
				</h1>
				<p className="text-text text-justify text-[1rem] mb-4">{post.post}</p>
				<Link
					to={`/blog/` + post.title.toLowerCase().split(" ").join("-")}
					className={isOwnPage ? "hidden" : "block"}
				>
					<button className="bg-logopink rounded-xl px-4 py-2 text-white font-[600] shadow-xl self-center">
						Read article
					</button>
				</Link>
			</div>
		</div>
	);
};

export default BlogPostCard;
