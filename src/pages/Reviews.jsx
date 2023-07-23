import { reviews } from "../constants";
import { ReviewCard, ImageCarousel, Postcard } from "../components";

const Reviews = () => {
	return (
		<div className="md:mt-56 mt-36 3xl:w-[80%] xl:w-[90%] w-full flex flex-col items-center bg-glass glass shadow-xl rounded-xl pt-8 pb-12">
			<h1 className="xl:text-[3rem] text-[2rem] text-center text-text font-[600] mb-8">
				Our Customers Wrote
			</h1>

			<Postcard />

			<ImageCarousel type="review">
				{reviews.map((review) => (
					<ReviewCard key={review.name} review={review} />
				))}
			</ImageCarousel>
		</div>
	);
};

export default Reviews;
