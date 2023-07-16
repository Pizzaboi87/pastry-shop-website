import { stamp } from "../assets";
import { reviews } from "../constants";
import { ReviewCard } from "../components";

const Reviews = () => {
	return (
		<div className="mt-56 w-[85%] flex flex-col items-center bg-white rounded-xl p-8">
			<div className="bg-pinklight w-[50%] h-[30rem] flex flex-col items-center justify-center rounded-xl">
				<h1 className="text-brown text-[3rem] font-[400] mb-8">
					Our Customers Wrote
				</h1>
				<div className="box w-[25rem] h-[20rem] bg-white relative">
					<div className="absolute border-[0.625rem] border-white top-2 left-2 w-[24rem] h-[19rem] bg-stamp bg-cover" />
					<img
						src={stamp}
						alt="stamp"
						className="absolute w-[40%] bottom-[2rem] left-[2rem]"
					/>
				</div>
			</div>
			<div className="cardContainer">
				{reviews.map((review) => (
					<ReviewCard key={review.name} review={review} />
				))}
			</div>
		</div>
	);
};

export default Reviews;
