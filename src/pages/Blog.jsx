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

	const images = dummyPosts.map((post, index) => (
		<div className="flex flex-col items-center cursor-pointer" key={index}>
			<img
				src={post.image}
				alt="image"
				className="w-[15rem] h-[15rem] object-cover"
			/>
			<p>{post.title}</p>
		</div>
	));

	const posts = dummyPosts.map((post, index) => (
		<div key={index} className="bg-pinklight w-full h-[30rem] flex flex-col">
			<img
				src={post.image}
				alt="image"
				className="w-full h-[50%] object-cover"
			/>
			<h1 className="self-center mt-4 mb-4 text-text text-[1.3rem] font-[600]">
				{post.title}
			</h1>
			<p className="text-text text-justify text-[1rem] mb-4">{post.post}</p>
			<button className="bg-logopink rounded-xl px-4 py-2 text-white shadow-xl self-center">
				Read article
			</button>
		</div>
	));

	return (
		<div className="md:mt-56 mt-36 xl:w-[90%] 3xl:w-[80%] w-full bg-white rounded-xl md:p-12 p-4">
			<h1 className="text-brown xl:text-[3rem] text-[2rem] font-[400] mb-8 text-center">
				Blog
			</h1>
			<ImageCarousel>{images}</ImageCarousel>
			<div className="flex border-red border-2 mt-16 w-full">
				<div className="border-red border-2 flex flex-col">{posts}</div>
				<div className="border-red border-2 w-full h-[40vh]">
					<h1>Important text</h1>
				</div>
			</div>
		</div>
	);
};

export default Blog;
