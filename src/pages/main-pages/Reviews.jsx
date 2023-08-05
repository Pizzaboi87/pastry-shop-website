import { otherText, reviews } from "../../constants";
import { Theme_H1, titleStyle } from "../../styles";
import {
  ReviewCard,
  ImageCarousel,
  Postcard,
  TransitionParent,
} from "../../components";

const Reviews = () => {
  return (
    <TransitionParent isFlex isRew>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {otherText.reviewsTitle}
      </Theme_H1>

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
