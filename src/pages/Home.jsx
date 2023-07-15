import { macaron, eclair, cream } from "../assets";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { LinkButton, Image, TextAndImage } from "../components";
import { homeTitle, homeSubtitle, homeText1, homeText2 } from "../constants";

const Home = () => {
  const motionPropsR = slideIn("right");

  return (
    <>
      <div className="flex items-center justify-center gap-12 3xl:mt-64 mt-44">
        <motion.span
          initial={motionPropsR.initial}
          whileInView={motionPropsR.whileInView}
          viewport={motionPropsR.viewport}
          className="w-[40%] text-brown px-8"
        >
          <div className="mb-6">
            {homeTitle.map((line) => (
              <h1 className="text-[4.5rem] font-[300]" key={line}>
                {line}
              </h1>
            ))}

            {homeSubtitle.map((line) => (
              <p className="my-2 text-[0.95rem]" key={line[0]}>
                {line}
              </p>
            ))}
          </div>

          <LinkButton
            extraClass="font-[500] px-8 py-2 text-[1.3rem]"
            whereTo="/login"
          >
            ORDER NOW
          </LinkButton>
        </motion.span>

        <Image dirPic="left" image={macaron} imgFirst={true} width={40} />
      </div>

      <TextAndImage
        dirPic="right"
        dirText="left"
        image={eclair}
        imgFirst={true}
        text={homeText1}
        width={40}
      />
      <TextAndImage
        dirPic="left"
        dirText="right"
        image={cream}
        imgFirst={false}
        text={homeText2}
        width={40}
      />
    </>
  );
};

export default Home;
