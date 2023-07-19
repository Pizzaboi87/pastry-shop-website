import { reviews } from "../constants";
import { ReviewCard, ImageCarousel, Postcard } from "../components";

const Reviews = () => {
	return (
		<div className="md:mt-56 mt-36 3xl:w-[75%] xl:w-[95%] w-full flex flex-col items-center bg-pinklight rounded-xl pt-8 pb-12">
			<h1 className="xl:text-[3rem] text-[2rem] text-center text-text font-[500] mb-8">
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
