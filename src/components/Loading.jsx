import { loading } from "../assets/";

import TransitionParent from "./TransitionParent";

const Loading = () => {
  return (
    <div className="3xl:mt-64 mt-44 flex flex-col w-full h-full items-center justify-center">
      <img src={loading} alt="loading" className="w-[20rem] h-[20rem]" />
      <h1 className="text-text text-[2rem] font-[500]">loading...</h1>
    </div>
  );
};

export default Loading;
