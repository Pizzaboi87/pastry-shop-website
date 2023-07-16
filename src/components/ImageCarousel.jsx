import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ImageCarousel = ({ children }) => {
	return (
		<Carousel
			additionalTransfrom={0}
			arrows
			autoPlay
			autoPlaySpeed={2500}
			centerMode={true}
			className="w-full pt-8"
			containerClass="container-with-dots pb-16"
			dotListClass=""
			draggable
			focusOnSelect={false}
			infinite
			itemClass=""
			keyBoardControl
			minimumTouchDrag={80}
			pauseOnHover
			renderArrowsWhenDisabled={false}
			renderButtonGroupOutside={false}
			renderDotsOutside={false}
			responsive={{
				desktop: {
					breakpoint: {
						max: 3000,
						min: 1024,
					},
					items: 3,
					partialVisibilityGutter: 30,
				},
				mobile: {
					breakpoint: {
						max: 464,
						min: 0,
					},
					items: 1,
					partialVisibilityGutter: 30,
				},
				tablet: {
					breakpoint: {
						max: 1024,
						min: 464,
					},
					items: 2,
					partialVisibilityGutter: 30,
				},
			}}
			rewind={false}
			rewindWithAnimation={false}
			rtl={false}
			shouldResetAutoplay
			showDots={true}
			sliderClass=""
			slidesToSlide={1}
			swipeable
		>
			{children}
		</Carousel>
	);
};

export default ImageCarousel;
