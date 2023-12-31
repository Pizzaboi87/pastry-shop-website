import { UserContext } from "../../context";
import { useContext } from "react";
import { Theme_H1, titleStyle } from "../../styles";
import {
  ReviewCard,
  ImageCarousel,
  Postcard,
  TransitionParent,
} from "../../components";

const Reviews = () => {
  const { text } = useContext(UserContext);

  return (
    <TransitionParent isFlex isRew>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.reviewsTitle}
      </Theme_H1>

      <Postcard />

      <ImageCarousel type="review">
        {text.reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </ImageCarousel>
    </TransitionParent>
  );
};

export default Reviews;
