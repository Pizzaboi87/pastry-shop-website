import { motion } from "framer-motion";

const TransitionParent = ({ children, isHome, isFlex }) => {
  return (
    <motion.div
      className={`
        ${
          isHome
            ? "3xl:mt-64 xl:mt-56 mt-44 w-full flex flex-col items-center overflow-hidden"
            : "md:mt-56 mt-36 3xl:w-[80%] xl:w-[90%] bg-glass glass shadow-xl rounded-xl md:p-12 p-4"
        }
          ${isFlex ? "flex flex-col items-center" : "grid grid-cols-6 gap-x-12"}
      `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionParent;
