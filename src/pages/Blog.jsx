import { BlogCarousel, BlogCategoryCard, BlogPostCard } from "../components";
import { dummyPosts, categories } from "../content";

const Blog = () => {
	return (
		<div className="glass grid grid-cols-4 md:mt-56 mt-36 xl:w-[90%] 3xl:w-[80%] w-full bg-glass rounded-xl md:p-12 p-4 gap-x-12 shadow-2xl">
			<h1 className="col-span-4 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center">
				Our Blog
			</h1>

			<div className="col-span-4 mb-24">
				<BlogCarousel posts={dummyPosts} />
			</div>

			<BlogCategoryCard categories={categories} />

			<div className="xl:col-span-3 col-span-4 ">
				{dummyPosts.map((post, index) => (
					<BlogPostCard key={index} post={post} />
				))}
			</div>
		</div>
	);
};

export default Blog;
