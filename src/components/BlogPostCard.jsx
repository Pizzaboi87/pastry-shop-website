const BlogPostCard = ({ post }) => {
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
				<button className="bg-logopink rounded-xl px-4 py-2 text-white shadow-xl self-center">
					Read article
				</button>
			</div>
		</div>
	);
};

export default BlogPostCard;
