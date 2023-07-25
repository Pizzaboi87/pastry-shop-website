import { stop } from "../assets";

const NoPermission = () => {
  return (
    <div className="glass flex flex-col items-center justify-center md:mt-56 mt-36 xl:w-[90%] 3xl:w-[80%] w-full bg-glass rounded-xl md:p-12 p-4 gap-x-12 shadow-2xl">
      <h1 className="text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8">
        You do not have permission to view this page.
      </h1>
      <img src={stop} alt="stop" className="w-[15rem]" />
    </div>
  );
};

export default NoPermission;
