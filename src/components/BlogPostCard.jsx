import { Link } from "react-router-dom";

const BlogPostCard = ({ post, isOwnPage }) => {
	const article = post.post
		.split("\n\n")
		.map((paragraph, index) => (
			<p key={index}>
				{paragraph
					.split("\n")
					.reduce((total, line, index) => [total, <br key={index} />, line])}
			</p>
		));

	return (
		<div className="bg-primary w-full rounded-2xl mb-16 shadow-xl">
			<img
				src={post.image}
				alt="image"
				className="w-full h-[25rem] object-cover rounded-t-2xl"
			/>

			<div className="p-8 flex flex-col items-center justify-center">
				{!isOwnPage && (
					<h1 className="self-center mb-4 text-text text-[1.3rem] font-[600]">
						{post.title}
					</h1>
				)}

				{isOwnPage && (
					<div className="flex w-full justify-between mb-4">
						<h2>{post.date}</h2>
						<h2>{post.author}</h2>
					</div>
				)}

				<p
					className={`${
						isOwnPage ? "font-[600]" : "font-[400]"
					} text-text text-justify text-[1rem] mb-4`}
				>
					{post.blurb}
				</p>

				{isOwnPage && (
					<span className="text-text text-justify text-[1rem] mb-4">
						{article}
					</span>
				)}

				<ul className="flex gap-4 self-start mt-4">
					{isOwnPage &&
						post.tags.map((tag, index) => (
							<li key={index} className="text-[1.2rem]">
								{tag}
							</li>
						))}
				</ul>

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
