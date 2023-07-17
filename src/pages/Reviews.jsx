import { reviews } from "../constants";
import { ReviewCard, ImageCarousel, Postcard } from "../components";

const Reviews = () => {
	return (
		<div className="mt-56 w-[75%] flex flex-col items-center bg-pinklight rounded-xl py-12">
			<h1 className="text-brown text-[3em] font-[400] mb-8">
				Our Customers Wrote
			</h1>

			<Postcard />

			<ImageCarousel>
				{reviews.map((review) => (
					<ReviewCard key={review.name} review={review} />
				))}
			</ImageCarousel>
		</div>
	);
};

export default Reviews;
