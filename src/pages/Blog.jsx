import { ImageCarousel } from "../components";
import { eclair, cream, macaron, gift, waffle } from "../assets";

const Blog = () => {
	const dummyPosts = [
		{
			image: eclair,
			title: "Eclair Post",
			post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum id mauris sagittis malesuada. Cras lacinia erat vel velit sagittis sagittis. Sed finibus rhoncus turpis id mollis. Nullam turpis odio, egestas nec orci eu, efficitur feugiat diam. Pellentesque facilisis mauris eget orci feugiat, eget pellentesque nisi venenatis. Ut erat tellus, pharetra sit amet sollicitudin dignissim, lacinia eget felis. Etiam vitae ligula et dolor varius sagittis eu non ligula. Sed neque nisi, hendrerit eu ante in, cursus hendrerit lorem.",
		},
		{
			image: cream,
			title: "Cream Post",
			post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum id mauris sagittis malesuada. Cras lacinia erat vel velit sagittis sagittis. Sed finibus rhoncus turpis id mollis. Nullam turpis odio, egestas nec orci eu, efficitur feugiat diam. Pellentesque facilisis mauris eget orci feugiat, eget pellentesque nisi venenatis. Ut erat tellus, pharetra sit amet sollicitudin dignissim, lacinia eget felis. Etiam vitae ligula et dolor varius sagittis eu non ligula. Sed neque nisi, hendrerit eu ante in, cursus hendrerit lorem.",
		},
		{
			image: macaron,
			title: "Macaron Post",
			post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum id mauris sagittis malesuada. Cras lacinia erat vel velit sagittis sagittis. Sed finibus rhoncus turpis id mollis. Nullam turpis odio, egestas nec orci eu, efficitur feugiat diam. Pellentesque facilisis mauris eget orci feugiat, eget pellentesque nisi venenatis. Ut erat tellus, pharetra sit amet sollicitudin dignissim, lacinia eget felis. Etiam vitae ligula et dolor varius sagittis eu non ligula. Sed neque nisi, hendrerit eu ante in, cursus hendrerit lorem.",
		},
		{
			image: gift,
			title: "Gift Post",
			post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum id mauris sagittis malesuada. Cras lacinia erat vel velit sagittis sagittis. Sed finibus rhoncus turpis id mollis. Nullam turpis odio, egestas nec orci eu, efficitur feugiat diam. Pellentesque facilisis mauris eget orci feugiat, eget pellentesque nisi venenatis. Ut erat tellus, pharetra sit amet sollicitudin dignissim, lacinia eget felis. Etiam vitae ligula et dolor varius sagittis eu non ligula. Sed neque nisi, hendrerit eu ante in, cursus hendrerit lorem.",
		},
		{
			image: waffle,
			title: "Waffle Post",
			post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum id mauris sagittis malesuada. Cras lacinia erat vel velit sagittis sagittis. Sed finibus rhoncus turpis id mollis. Nullam turpis odio, egestas nec orci eu, efficitur feugiat diam. Pellentesque facilisis mauris eget orci feugiat, eget pellentesque nisi venenatis. Ut erat tellus, pharetra sit amet sollicitudin dignissim, lacinia eget felis. Etiam vitae ligula et dolor varius sagittis eu non ligula. Sed neque nisi, hendrerit eu ante in, cursus hendrerit lorem.",
		},
	];

	const categories = [
		"history",
		"fun-facts",
		"events",
		"good-ideas",
		"kitchen-news",
		"book-review",
	];

	const images = dummyPosts.map((post, index) => (
		<div className="flex flex-col items-center cursor-pointer" key={index}>
			<img
				src={post.image}
				alt="image"
				className="w-[10rem] h-[10rem] object-cover"
			/>
			<p>{post.title}</p>
		</div>
	));

	const categoryItems = categories.map((category, index) => (
		<li
			className="text-logopink font-[700] text-[1rem] cursor-pointer"
			key={index}
		>
			{category}
		</li>
	));

	const posts = dummyPosts.map((post, index) => (
		<div
			key={index}
			className="bg-primary w-full flex flex-col rounded-2xl mb-16 shadow-xl"
		>
			<img
				src={post.image}
				alt="image"
				className="w-full h-[25rem] object-cover rounded-t-2xl"
			/>
			<h1 className="self-center mt-4 mb-4 text-text text-[1.3rem] font-[600]">
				{post.title}
			</h1>
			<p className="text-text text-justify text-[1rem] mb-4 p-2">{post.post}</p>
			<button className="bg-logopink rounded-xl px-4 py-2 mb-16 text-white shadow-xl self-center">
				Read article
			</button>
		</div>
	));

	return (
		<div className="grid grid-cols-4 md:mt-56 mt-36 xl:w-[90%] 3xl:w-[80%] w-full bg-pinktransparent rounded-xl md:p-12 p-4 gap-x-12">
			<h1 className="col-span-4 text-brown xl:text-[3rem] text-[2rem] font-[400] mb-8 text-center">
				Blog
			</h1>

			<div className="col-span-4 mb-24">
				<ImageCarousel>{images}</ImageCarousel>
			</div>

			<div className="xl:sticky top-[20%] xl:col-span-1 col-span-4 w-full rounded-xl border-green xl:mb-0 mb-6 flex flex-col h-[20vh] bg-primary items-center justify-center shadow-xl p-3">
				<h1 className="mb-6 text-text text-[1.5rem] font-[600]">
					Search by category
				</h1>
				<ul className="flex flex-wrap gap-x-6">{categoryItems}</ul>
			</div>

			<div className="xl:col-span-3 col-span-4 ">{posts}</div>
		</div>
	);
};

export default Blog;
