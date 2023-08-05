import { Fragment } from "react";
import { Theme_Div, awningStyle, shadowStyle } from "../styles";

const Awning = () => {
  const n = Math.ceil(window.innerWidth / 160);
  const awnings = [...Array(n)].map((_, i) => (
    <Fragment key={i}>
      <Theme_Div $bg="light" className={awningStyle.wrapper}>
        <div className={awningStyle.shadow} style={shadowStyle} />
      </Theme_Div>
      <Theme_Div $bg="logo" className={awningStyle.wrapper}>
        <div className={awningStyle.shadow} style={shadowStyle} />
      </Theme_Div>
    </Fragment>
  ));

  return (
    <div className="w-full h-[3.5rem] fixed top-0 left-0 z-[11] flex">
      {awnings}
    </div>
  );
};

export default Awning;
