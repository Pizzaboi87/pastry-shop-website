import { loading } from "../assets/";

const Loading = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <img src={loading} alt="loading" className="w-[20rem] h-[20rem]" />
      <h1 className="text-text text-[2rem] font-[500] -mt-[5rem]">
        loading...
      </h1>
    </div>
  );
};

export default Loading;
