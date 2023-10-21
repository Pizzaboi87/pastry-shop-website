import { macBlue, macBrown, macGreen, macPurple, macYellow } from "../assets/";
import { Theme_Button, Theme_Div } from "../styles";
import Category from "./Category";

const Banner = ({ categories, setCategorySelector }) => {
  return (
    <Theme_Div
      $bgcolor="background"
      $bordercolor="transparent"
      className="xl:w-[85vw] w-full flex xl:flex-row flex-col-reverse items-center justify-evenly xl:px-16 rounded-xl self-center shadow-inner shadow-black"
    >
      <div className="flex flex-col xl:w-auto w-full items-center justify-between min-h-[12rem] xl:mr-10">
        <form className="flex gap-4 xl:flex-row flex-col mt-6 xl:mt-0">
          <input
            className="rounded-xl p-2 pl-4 w-[20rem]"
            type="text"
            placeholder="Search products"
          />
          <Theme_Button
            $bgcolor="logo"
            $textcolor="textlight"
            $bordercolor="transparent"
            $hoverbgcolor="dark"
            $hovertextcolor="textlight"
            className="rounded-xl px-2 xl:w-auto w-[50%] self-center py-2"
          >
            Search
          </Theme_Button>
        </form>

        <div className="w-full flex items-center justify-center my-6 xl:my-0 mx-2 xl:mx-0 xl:gap-8 gap-2 flex-wrap">
          {categories.map((category, index) => (
            <Category
              key={index}
              category={category}
              setCategorySelector={setCategorySelector}
            />
          ))}
        </div>
      </div>

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
