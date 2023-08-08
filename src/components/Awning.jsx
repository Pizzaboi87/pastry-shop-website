import { Fragment, useEffect, useState } from "react";
import { Theme_Div, awningStyle, shadowStyle } from "../styles";

const Awning = () => {
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(Math.ceil(window.innerWidth / 160));
  }, [window.innerWidth]);

  const awnings = [...Array(n)].map((_, i) => (
    <Fragment key={i}>
      <Theme_Div
        $bgcolor="light"
        $bordercolor="transparent"
        className={awningStyle.wrapper}
      >
        <div className={awningStyle.shadow} style={shadowStyle} />
      </Theme_Div>
      <Theme_Div
        $bgcolor="logo"
        $bordercolor="transparent"
        className={awningStyle.wrapper}
      >
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
