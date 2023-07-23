import { useEffect, useState } from "react";
import { categories } from "../content";
import BlogCategoryCard from "./BlogCategoryCard";
import BlogProposalCard from "./BlogProposalCard";

const BlogStickyCard = ({ posts }) => {
	const [postProposals, setPostProposals] = useState([]);

	useEffect(() => {
		const shuffledPosts = posts.sort(() => 0.5 - Math.random()).slice(0, 3);
		setPostProposals(shuffledPosts);
	}, []);

	return (
		<div className="xl:sticky top-[20%] xl:col-span-1 col-span-4 w-full h-fit flex flex-col">
			<BlogCategoryCard categories={categories} />
			<div className="flex xl:flex-col mb-6 gap-x-4 xl:gap-y-4 xl:mt-4">
				{postProposals.map((post) => (
					<BlogProposalCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
};

export default BlogStickyCard;
