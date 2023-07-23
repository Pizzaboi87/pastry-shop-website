import { useEffect, useState } from "react";

const BlogProposalCard = ({ post }) => {
	const [cuttedPhrase, setCuttedPhrase] = useState();

	useEffect(() => {
		const cardText = post.post.split(" ").reduce(
			(acc, c) => {
				const currIndex = acc.length - 1;
				const currLength = acc[currIndex].join(" ").length;
				if (currLength + c.length > 40) acc.push([c]);
				else acc[currIndex].push(c);

				return acc;
			},
			[[]]
		);

		setCuttedPhrase(cardText.map((parts) => parts.join(" "))[0]);
	}, []);

	return (
		<div className="bg-primary h-fit rounded-xl p-3 grid grid-cols-6 shadow-xl cursor-pointer">
			<img
				src={post.image}
				alt={post.title}
				className="col-span-2 bg-logopink rounded-full w-[5rem] h-[5rem] object-cover border-2 border-white"
			/>
			<div className="col-span-4 flex flex-col items-center w-full">
				<h1 className="text-text text-[1rem] font-[600]">{post.title}</h1>
				<p>{`${cuttedPhrase} (...)`}</p>
			</div>
		</div>
	);
};

export default BlogProposalCard;
