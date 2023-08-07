import { loading } from "../assets/";
import { text } from "../constants";

const Loading = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <img src={loading} alt="loading" className="w-[20rem] h-[20rem]" />
      <h1 className="text-text text-[2rem] font-[500] -mt-[5rem]">
        {text.loading}
      </h1>
    </div>
  );
};

export default Loading;
