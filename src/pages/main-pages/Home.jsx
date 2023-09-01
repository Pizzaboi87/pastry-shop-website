import { UserContext } from "../../context";
import { Image, TextAndImage, TransitionParent } from "../../components";
import { Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { slideIn } from "../../utils/motion";
import { macaron, eclair, cream } from "../../assets";
import { Theme_Button, Theme_Motion_Span, homeStyle } from "../../styles";

const Home = () => {
  const { currentUser, text, isReg, setIsReg } = useContext(UserContext);
  const motionPropsR = slideIn("right");

  return (
    <TransitionParent isHome isFlex>
      <div className={homeStyle.container}>
        <Theme_Motion_Span
          $textcolor="title"
          initial={motionPropsR.initial}
          whileInView={motionPropsR.whileInView}
          viewport={motionPropsR.viewport}
          className={homeStyle.motionSpan}
        >
          <div className={homeStyle.titleContainer}>
            <span className={homeStyle.titleSpan}>
              {text.homeTitle.map((line) => (
                <Fragment key={line}>
                  <h1 className={homeStyle.title}>{line}</h1>
                  <h1 className={homeStyle.titleSpace}>&nbsp;</h1>
                </Fragment>
              ))}
            </span>

            <p className={homeStyle.subTitle}>{text.homeSubtitle}</p>
          </div>

          <Link to={currentUser ? "/shop" : "/auth"}>
            <Theme_Button
              $bgcolor="logo"
              $textcolor="textlight"
              $bordercolor="transparent"
              $hoverbgcolor="dark"
              $hovertextcolor="textlight"
              className={homeStyle.buttonFirst}
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
            $textcolor="textlight"
            $bordercolor="transparent"
            $hoverbgcolor="dark"
            $hovertextcolor="textlight"
            className={homeStyle.buttonSecond}
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
