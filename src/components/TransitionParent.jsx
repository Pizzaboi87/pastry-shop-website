import ScrollToTop from "./ScrollToTop";
import { motion } from "framer-motion";

const TransitionParent = ({ children, isHome, isFlex, isRew }) => {
  return (
    <motion.div
      className={`
        ${
          isHome
            ? "3xl:mt-64 xl:mt-56 mt-44 w-full flex flex-col items-center overflow-hidden"
            : "md:mt-56 mt-36 3xl:w-[80%] xl:w-[90%] w-full bg-glass glass shadow-xl rounded-xl"
        }
          ${isFlex ? "flex flex-col items-center" : "grid grid-cols-6 gap-x-12"}
          ${isRew ? "pt-8 pb-12" : "md:p-12 p-4"}
      `}
      //md:mt-56 mt-36 3xl:w-[80%] xl:w-[90%] w-full flex flex-col items-center bg-glass glass shadow-xl rounded-xl pt-8 pb-12
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollToTop />
      {children}
    </motion.div>
  );
};

export default TransitionParent;
