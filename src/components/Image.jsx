import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { imageStyle } from "../styles";

const Image = ({ dirPic, image, imgFirst }) => {
  const motionProps = slideIn(dirPic);

  return (
    <motion.img
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      viewport={motionProps.viewport}
      src={image}
      alt={image}
      className={`${imgFirst ? imageStyle.first : imageStyle.notFirst} ${
        imageStyle.image
      }`}
    />
  );
};

export default Image;
