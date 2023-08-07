import { Fragment, useContext } from "react";
import { macaron, eclair, cream } from "../../assets";
import { slideIn } from "../../utils/motion";
import { Image, TextAndImage, TransitionParent } from "../../components";
import { IsRegContext, UserContext, LanguageContext } from "../../context";
import { Theme_Button, Theme_Motion_Span } from "../../styles";
import { Link } from "react-router-dom";

const Home = () => {
  const motionPropsR = slideIn("right");
  const [isReg, setIsReg] = useContext(IsRegContext);
  const { currentUser } = useContext(UserContext);
  const { text } = useContext(LanguageContext);

  return (
    <TransitionParent isHome isFlex>
      <div className="xl:w-[75%] w-full flex xl:flex-row flex-col items-center justify-center">
        <Theme_Motion_Span
          $textcolor="title"
          initial={motionPropsR.initial}
          whileInView={motionPropsR.whileInView}
          viewport={motionPropsR.viewport}
          className="px-8 2xl:px-0"
        >
          <div className="lg:mb-6 2xl:max-w-[95%]">
            <span className="flex xl:flex-col flex-row flex-wrap lg:mb-2">
              {text.homeTitle.map((line) => (
                <Fragment key={line}>
                  <h1 className="3xl:text-[4.5rem] 2xl:text-[3.5rem] text-[2.1rem] 2xl:font-[400] font-[600]">
                    {line}
                  </h1>
                  <h1 className="visible xl:hidden text-[2rem]">&nbsp;</h1>
                </Fragment>
              ))}
            </span>

            <p className="xl:my-2 2xl:text-[1rem] xl:text-[1.2rem] text-[1.4rem] text-justify 2xl:max-w-[80%]">
              {text.homeSubtitle}
            </p>
          </div>

          <Link to={currentUser ? "/shop" : "/auth"}>
            <Theme_Button
              $bgcolor="logo"
              $hoverbgcolor="dark"
              $textcolor="textlight"
              className="rounded-xl shadow-sm border-none text-center font-[500] px-8 py-3 text-[1.3rem] 2xl:inline-block hidden"
              onClick={() => setIsReg(false)}
            >
              {text.homeButton}
            </Theme_Button>
          </Link>
        </Theme_Motion_Span>

        <Image dirPic="left" image={macaron} imgFirst={true} width={40} />

        <Link to={currentUser ? "/shop" : "/auth"}>
          <Theme_Button
            $bgcolor="logo"
            $hoverbgcolor="dark"
            $textcolor="textlight"
            className="rounded-xl shadow-sm border-none text-center font-[500] px-8 py-3 text-[2rem] md:text-[3rem] xl:hidden inline-block mt-16 mb-0"
            onClick={() => setIsReg(false)}
          >
            {text.homeButton}
          </Theme_Button>
        </Link>
      </div>

      <TextAndImage
        dirPic="right"
        dirText="left"
        image={eclair}
        imgFirst={true}
        text={text.homeText1}
        width={40}
        flexDir="flex-col-reverse"
      />
      <TextAndImage
        dirPic="left"
        dirText="right"
        image={cream}
        imgFirst={false}
        text={text.homeText2}
        width={40}
        flexDir="flex-col"
      />
    </TransitionParent>
  );
};

export default Home;
