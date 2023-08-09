import { Fragment, useEffect, useState, useRef } from "react";
import { Theme_Div, awningStyle, shadowStyle } from "../styles";

const Awning = () => {
  const [n, setN] = useState(0);
  const awningRef = useRef(null);

  const handleResize = (entries) => {
    const newN = Math.ceil(entries[0].contentRect.width / 160);
    setN(newN);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(awningRef.current);

    return () => {
      resizeObserver.unobserve(awningRef.current);
    };
  }, []);

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
    <div
      className="w-full h-[3.5rem] fixed top-0 left-0 z-[11] flex"
      ref={awningRef}
    >
      {awnings}
    </div>
  );
};

export default Awning;
