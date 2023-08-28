import TransitionParent from "./TransitionParent";
import { UserContext } from "../context";
import { useContext } from "react";
import { stop } from "../assets";
import { Theme_H1, noPermissionStyle, titleStyle } from "../styles";

const NoPermission = () => {
  const { text } = useContext(UserContext);

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.noPermissionTitle}
      </Theme_H1>
      <img src={stop} alt="stop" className={noPermissionStyle.image} />
    </TransitionParent>
  );
};

export default NoPermission;
