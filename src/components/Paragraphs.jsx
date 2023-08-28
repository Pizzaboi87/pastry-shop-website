import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { paragraphsStyle } from "../styles";

const Paragraphs = ({ dirText, imgFirst, text }) => {
  const motionProps = slideIn(dirText);

  return (
    <motion.span
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      viewport={motionProps.viewport}
      className={`${
        imgFirst ? paragraphsStyle.imgFirst : paragraphsStyle.imgLast
      } ${paragraphsStyle.wrapper}`}
    >
      {text.map((paragraph, index) => (
        <p
          key={`${paragraph[0]}-${index}`}
          className={paragraphsStyle.paragraph}
        >
          {paragraph}
        </p>
      ))}
    </motion.span>
  );
};

export default Paragraphs;
