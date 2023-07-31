import { Fragment } from "react";
import { awningStyle, shadowStyle } from "../styles";

const Awning = () => {
  const n = Math.ceil(window.innerWidth / 160);
  const awnings = [...Array(n)].map((_, i) => (
    <Fragment key={i}>
      <div className={`${awningStyle.wrapper} bg-pinklight`}>
        <div className={awningStyle.shadow} style={shadowStyle} />
      </div>
      <div className={`${awningStyle.wrapper} bg-logopink`}>
        <div className={awningStyle.shadow} style={shadowStyle} />
      </div>
    </Fragment>
  ));

  return (
    <div className="w-full h-[3.5rem] fixed top-0 left-0 z-[11] flex">
      {awnings}
    </div>
  );
};

export default Awning;
