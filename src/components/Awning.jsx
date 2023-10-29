import { Fragment, useEffect, useState } from "react";
import { Theme_Div, awningStyle, shadowStyle } from "../styles";

const Awning = () => {
  const [windowWidth, setWindowWidth] = useState(
    Math.ceil(window.innerWidth / 160)
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(Math.ceil(window.innerWidth / 160));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const awnings = [...Array(windowWidth)].map((_, i) => (
    <Fragment key={i}>
      <Theme_Div
        $bgcolor="light"
        $bordercolor="transparent"
        className={awningStyle.awning}
      >
        <div className={awningStyle.shadow} style={shadowStyle} />
      </Theme_Div>
      <Theme_Div
        $bgcolor="logo"
        $bordercolor="transparent"
        className={awningStyle.awning}
      >
        <div className={awningStyle.shadow} style={shadowStyle} />
      </Theme_Div>
    </Fragment>
  ));

  return <div className={awningStyle.wrapper}>{awnings}</div>;
};

export default Awning;
