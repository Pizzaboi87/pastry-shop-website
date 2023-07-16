import { logo } from "../assets";
import { Icon } from "@iconify/react";

const ReviewCard = ({ review }) => {
	const stars = review.stars;

	return (
		<div className="bg-white w-[20rem] h-[30rem] border relative flex flex-col items-center rounded-xl shadow-xl hover:cursor-grab active:cursor-grabbing">
			<img
				src={review.background}
				alt="background"
				className="w-full h-[25%] bg-cover rounded-t-xl object-cover"
			/>
			<img
				src={review.profile}
				alt="profile"
				className="bg-white rounded-full w-[10rem] h-[10rem] absolute top-[10%] object-cover border-4 border-white"
			/>
			<div className="flex flex-col items-center absolute top-[45%]">
				<h1 className="text-text text-[1.6rem] font-[600]">{review.name}</h1>
				<h2 className="text-text text-[1.3rem] font-[400]">{review.job}</h2>
			</div>
			<p className="italic text-text text-[1rem] font-[300] absolute top-[65%] text-justify px-4">
				{`"${review.review}"`}
			</p>
			<span className="absolute top-[88%] flex w-full left-[33%]">
				{[...Array(5)].map((_, index) => (
					<Icon
						key={index}
						icon="ph:star-light"
						className="text-yellowdark text-[1.4rem]"
					/>
				))}
			</span>
			<span className="absolute top-[88%] flex w-full left-[33%]">
				{[...Array(stars)].map((_, index) => (
					<Icon
						key={index}
						icon="ph:star-fill"
						className="text-yellowdark text-[1.4rem]"
					/>
				))}
			</span>
		</div>
	);
};

export default ReviewCard;