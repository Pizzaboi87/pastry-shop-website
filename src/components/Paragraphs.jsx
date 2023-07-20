import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";

const Paragraphs = ({ dirText, imgFirst, text }) => {
  const motionProps = slideIn(dirText);

  return (
    <motion.span
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      viewport={motionProps.viewport}
      className={`${
        imgFirst ? "2xl:ml-24" : "ml-0"
      } md:text-justify 2xl:max-w-[40%] max-w-[90%] 2xl:text-[1.25rem] text-[1.5rem] mt-8 xl:mt-0  text-text leading-9`}
    >
      {text.map((paragraph, index) => (
        <p key={`${paragraph[0]}-${index}`} className="my-2">
          {paragraph}
        </p>
      ))}
    </motion.span>
  );
};

export default Paragraphs;
