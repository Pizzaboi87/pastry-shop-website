import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Theme_Div, Theme_Img } from "../styles";

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
      $bg="primary"
      className="mx-auto xs:w-[20rem] w-[16rem] h-[30rem] border relative flex flex-col items-center rounded-xl shadow-xl hover:cursor-grab active:cursor-grabbing"
    >
      <img
        src={bgImage}
        alt="background"
        className="w-full h-[25%] bg-cover rounded-t-xl object-cover"
      />
      <Theme_Img
        $bg="primary"
        $border="primary"
        src={image}
        alt="profile"
        className="rounded-full w-[10rem] h-[10rem] absolute top-[10%] object-cover border-4"
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
    </Theme_Div>
  );
};

export default ReviewCard;
