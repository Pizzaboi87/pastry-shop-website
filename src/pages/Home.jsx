import { macaron, eclair, cream } from "../assets";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { LinkButton, Image, TextAndImage } from "../components";
import { homeTitle, homeSubtitle, homeText1, homeText2 } from "../constants";

const Home = () => {
  const motionPropsR = slideIn("right");

  return (
    <div className="3xl:mt-64 xl:mt-56 mt-44 w-full flex flex-col items-center">
      <div className="xl:w-[75%] w-full flex xl:flex-row flex-col items-center justify-center">
        <motion.span
          initial={motionPropsR.initial}
          whileInView={motionPropsR.whileInView}
          viewport={motionPropsR.viewport}
          className="text-brown px-8 2xl:px-0"
        >
          <div className="mb-6 2xl:max-w-[95%]">
            <span className="flex xl:flex-col flex-row flex-wrap mb-2">
              {homeTitle.map((line) => (
                <>
                  <h1
                    className="3xl:text-[4.5rem] 2xl:text-[3.5rem] text-[2.2rem] 2xl:font-[300] font-[600]"
                    key={line}
                  >
                    {line}
                  </h1>
                  <h1 className="visible xl:hidden text-[2rem]">&nbsp;</h1>
                </>
              ))}
            </span>

            <p className="xl:my-2 2xl:text-[1rem] xl:text-[1.2rem] text-[1.4rem] text-justify 2xl:max-w-[80%]">
              {homeSubtitle}
            </p>
          </div>

          <LinkButton
            extraClass="font-[500] px-8 py-3 text-[1.3rem] 2xl:inline-block hidden"
            whereTo="/auth"
          >
            ORDER NOW
          </LinkButton>
        </motion.span>

        <Image dirPic="left" image={macaron} imgFirst={true} width={40} />

        <LinkButton
          extraClass="font-[500] px-8 py-3 text-[2rem] md:text-[3rem] xl:hidden inline-block mt-16 mb-8 xl:mb-0"
          whereTo="/login"
        >
          ORDER NOW
        </LinkButton>
      </div>

      <TextAndImage
        dirPic="right"
        dirText="left"
        image={eclair}
        imgFirst={true}
        text={homeText1}
        width={40}
        flexDir="flex-col-reverse"
      />
      <TextAndImage
        dirPic="left"
        dirText="right"
        image={cream}
        imgFirst={false}
        text={homeText2}
        width={40}
        flexDir="flex-col"
      />
    </div>
  );
};

export default Home;
