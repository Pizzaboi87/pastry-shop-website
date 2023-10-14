import { macBlue, macBrown, macGreen, macPurple, macYellow } from "../assets/";
import { Theme_Div } from "../styles";

const Banner = () => {
  return (
    <Theme_Div
      $bgcolor="glasscard"
      $bordercolor="transparent"
      className="w-[85vw] h-[10rem] flex items-center justify-evenly px-16 rounded-xl self-center mb-[8rem]"
    >
      <form className="flex gap-4">
        <input
          className="rounded-xl p-2 w-[20rem]"
          type="text"
          placeholder="Search products"
        />
        <button className="bg-white rounded-xl px-2">Search</button>
      </form>
      <div className="mill w-[15rem] h-[15rem] rounded-full bg-white">
        <div className="background w-full h-full bg-logoimage bg-cover bg-center absolute"></div>
        <div className="w-[5rem] h-[5rem] rounded-full -translate-y-6 translate-x-8">
          <img src={macBlue} alt="macaron_blue" />
        </div>
        <div className="w-[5rem] h-[5rem] rounded-full -translate-y-[4rem] translate-x-[11rem]">
          <img src={macBrown} alt="macaron_blue" />
        </div>
        <div className="w-[5rem] h-[5rem] rounded-full -translate-y-[1rem] translate-x-[11rem]">
          <img src={macGreen} alt="macaron_blue" />
        </div>
        <div className="w-[5rem] h-[5rem] rounded-full -translate-y-[4rem] translate-x-[2rem]">
          <img src={macPurple} alt="macaron_blue" />
        </div>
        <div className="w-[5rem] h-[5rem] rounded-full -translate-y-[16rem] -translate-x-[2rem]">
          <img src={macYellow} alt="macaron_blue" />
        </div>
      </div>
    </Theme_Div>
  );
};

export default Banner;
