import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { Link } from "react-router-dom";
import { LinkButton } from "../components";

const CourseCard = ({ course, index }) => {
  const motionPropsR = slideIn("right", index * 0.25);
  const [image, setImage] = useState(null);

  const loadImage = async () => {
    const { default: image } = await import(`../assets/${course.image}.webp`);
    return image;
  };

  useEffect(() => {
    loadImage().then(setImage);
  }, []);

  if (!image) {
    return null;
  }

  return (
    <motion.div
      initial={motionPropsR.initial}
      whileInView={motionPropsR.whileInView}
      viewport={motionPropsR.viewport}
      className="w-[20rem] text-justify bg-pinklight p-4 rounded-[15px] shadow-xl flex flex-col items-center justify-between"
    >
      <div className="flex flex-col justify-center items-center w-full">
        <h3 className="mb-4 text-text text-[1.3rem] font-[500]">
          {course.title}
        </h3>
        <div className="overflow-hidden w-full h-[10rem] mb-8">
          <img
            src={image}
            alt={course.alt}
            className="w-[100%] h-[10rem] object-cover mb-4 hover:scale-150 hover:translate-y-8 ease-in-out transition-all duration-500"
          />
        </div>
      </div>
      <div className="h-full flex flex-col justify-between">
        <p className="text-text text-justify mb-4">{course.details}</p>
        <LinkButton
          extraClass="px-3 py-2 text-[1rem] font-[400]"
          whereTo={`/courses/` + course.id}
        >
          Learn More
        </LinkButton>
      </div>
    </motion.div>
  );
};

export default CourseCard;
