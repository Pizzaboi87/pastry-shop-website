import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Theme_Div, Theme_Img, reviewCardStyle } from "../styles";

const ReviewCard = ({ review }) => {
  const stars = review.stars;

  const [image, setImage] = useState(null);
  const [bgImage, setBgImage] = useState(null);

  const loadImages = async () => {
    const { default: image } = await import(`../assets/${review.profile}.webp`);
    const { default: bgImage } = await import(
      `../assets/${review.background}.webp`
    );
    setImage(image);
    setBgImage(bgImage);
  };

  useEffect(() => {
    loadImages();
  }, []);

  if (!image) {
    return null;
  }

  return (
    <Theme_Div
      $bgcolor="primary"
      $bordercolor="transparent"
      className={reviewCardStyle.wrapper}
    >
      <img
        src={bgImage}
        alt="background"
        className={reviewCardStyle.background}
      />
      <Theme_Img
        $bgcolor="primary"
        $bordercolor="primary"
        src={image}
        alt="profile"
        className={reviewCardStyle.profile}
      />
      <div className={reviewCardStyle.nameContainer}>
        <h1 className={reviewCardStyle.name}>{review.name}</h1>
        <h2 className={reviewCardStyle.job}>{review.job}</h2>
      </div>
      <p className={reviewCardStyle.review}>{`"${review.review}"`}</p>
      <span className={reviewCardStyle.span}>
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            icon="ph:star-light"
            className={reviewCardStyle.star}
          />
        ))}
      </span>
      <span className={reviewCardStyle.span}>
        {[...Array(stars)].map((_, index) => (
          <Icon
            key={index}
            icon="ph:star-fill"
            className={reviewCardStyle.star}
          />
        ))}
      </span>
    </Theme_Div>
  );
};

export default ReviewCard;
