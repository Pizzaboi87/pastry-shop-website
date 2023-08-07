import TransitionParent from "./TransitionParent";
import { stop } from "../assets";
import { text } from "../constants";
import { Theme_H1, titleStyle } from "../styles";

const NoPermission = () => {
  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.noPermissionTitle}
      </Theme_H1>
      <img src={stop} alt="stop" className="w-[15rem]" />
    </TransitionParent>
  );
};

export default NoPermission;
