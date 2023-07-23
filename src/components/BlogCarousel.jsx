import ImageCarousel from "./ImageCarousel";

const BlogCarousel = ({ posts }) => {
	const images = posts.map((post, index) => (
		<div className="flex flex-col items-center cursor-pointer" key={index}>
			<img
				src={post.image}
				alt="image"
				className="w-[13rem] h-[13rem] object-cover border-2 border-white rounded-xl shadow-xl mb-4"
			/>
			<p className="text-text font-[600] text-[1.2rem]">{post.title}</p>
		</div>
	));

	return <ImageCarousel>{images}</ImageCarousel>;
};

export default BlogCarousel;
