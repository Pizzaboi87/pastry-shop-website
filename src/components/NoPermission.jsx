import TransitionParent from "./TransitionParent";
import { useContext } from "react";
import { stop } from "../assets";
import { UserContext } from "../context";
import { Theme_H1, titleStyle } from "../styles";

const NoPermission = () => {
  const { text } = useContext(UserContext);

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
