import ScrollToTop from "./ScrollToTop";
import { Theme_Motion_Div } from "../styles";
import { motion } from "framer-motion";

const TransitionParent = ({ children, isHome, isFlex, isRew }) => {
  return (
    <Theme_Motion_Div
      $bgcolor={isHome ? "transparent" : "glasslight"}
      className={`
        ${
          isHome
            ? "3xl:mt-8 -mt-[2rem] w-full flex flex-col items-center overflow-hidden"
            : "3xl:w-[80%] xl:w-[90%] w-full glass shadow-xl rounded-xl"
        }
          ${isFlex ? "flex flex-col items-center" : "grid grid-cols-6 gap-x-12"}
          ${isRew ? "pt-8 pb-12" : "md:p-12 p-4"}
      `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollToTop />
      {children}
    </Theme_Motion_Div>
  );
};

export default TransitionParent;
