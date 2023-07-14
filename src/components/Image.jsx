import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";

const Image = ({ dirPic, image, imgFirst, width }) => {
  const motionProps = slideIn(dirPic);

  return (
    <motion.img
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      viewport={motionProps.viewport}
      src={image}
      alt={image}
      className={`${
        imgFirst ? "ml-0" : "ml-24"
      } max-w-[${width}%] rounded-[25px] shadow-xl`}
    />
  );
};

export default Image;
