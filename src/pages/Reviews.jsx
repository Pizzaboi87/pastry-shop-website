import { reviews } from "../constants";
import { motion } from "framer-motion";
import {
  ReviewCard,
  ImageCarousel,
  Postcard,
  TransitionParent,
} from "../components";

const Reviews = () => {
  return (
    <TransitionParent isFlex>
      <h1 className="xl:text-[3rem] text-[2rem] text-center text-text font-[600] mb-8">
        Our Customers Wrote
      </h1>

      <Postcard />

      <ImageCarousel type="review">
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </ImageCarousel>
    </TransitionParent>
  );
};

export default Reviews;
