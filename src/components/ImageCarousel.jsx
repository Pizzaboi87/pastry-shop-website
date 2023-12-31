import Carousel from "react-multi-carousel";
import { imageCarouselStyle } from "../styles";
import "react-multi-carousel/lib/styles.css";

const ImageCarousel = ({ children, type }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1401 },
      items: type === "review" ? 4 : 5,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1400, min: 1024 },
      items: type === "review" ? 3 : 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1023, min: 768 },
      items: type === "review" ? 2 : 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: type === "review" ? 1 : 2,
      slidesToSlide: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      containerClass={imageCarouselStyle.container}
      itemClass={type === "review" ? "mx-auto" : "mx-2"}
      autoPlay={true}
      swipeable={true}
      draggable={true}
      showDots={type === "review" ? true : false}
      infinite={true}
      partialVisible={false}
      renderDotsOutside={true}
      dotListClass={imageCarouselStyle.dotList}
    >
      {children}
    </Carousel>
  );
};

export default ImageCarousel;
