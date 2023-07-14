import { Fragment } from "react";

const Awning = () => {
  const n = Math.ceil(window.innerWidth / 160);
  const awnings = [...Array(n)].map((_, i) => (
    <Fragment key={i}>
      <div className="piece w-[80px] h-full bg-primary rounded-b-full shadow-xl">
        <div className="shadow w-full h-full rounded-b-full" />
      </div>
      <div className="piece w-[80px] h-full bg-pinkdark rounded-b-full shadow-xl">
        <div className="shadow w-full h-full rounded-b-full" />
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
