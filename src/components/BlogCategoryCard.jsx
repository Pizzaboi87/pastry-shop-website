const BlogCategoryCard = ({ categories }) => {
	const categoryItems = categories.map((category, index) => (
		<li
			className="text-logopink font-[700] text-[1rem] cursor-pointer"
			key={index}
		>
			{category}
		</li>
	));

	return (
		<div className="xl:sticky top-[20%] xl:col-span-1 col-span-4 w-full rounded-xl xl:mb-0 mb-6 flex flex-col h-[20vh] bg-primary items-center justify-center shadow-xl p-3">
			<h1 className="mb-6 text-text text-[1.5rem] font-[600]">
				Search by category
			</h1>
			<ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
				{categoryItems}
			</ul>
		</div>
	);
};

export default BlogCategoryCard;
