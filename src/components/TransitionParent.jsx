import { useScrollToTop } from "../utils/useScrollToTop";
import { Theme_Motion_Div, tParentStyle } from "../styles";

const TransitionParent = ({ children, isHome, isFlex, isRew }) => {
  useScrollToTop();

  return (
    <Theme_Motion_Div
      $bgcolor={isHome ? "transparent" : "glasslight"}
      className={`
        ${isHome ? tParentStyle.isHome : tParentStyle.notIsHome}
          ${isFlex ? tParentStyle.isFlex : tParentStyle.notIsFlex}
          ${isRew ? tParentStyle.isRew : tParentStyle.notIsRew}
      `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </Theme_Motion_Div>
  );
};

export default TransitionParent;
