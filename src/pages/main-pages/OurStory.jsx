import { UserContext } from "../../context";
import { TeamCard, TransitionParent } from "../../components";
import { useContext } from "react";
import { showcase } from "../../assets";
import { Theme_H1, ourStoryStyle, titleStyle } from "../../styles";

const OurStory = () => {
  const { text } = useContext(UserContext);

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.ourStory.title}
      </Theme_H1>
      <div className={ourStoryStyle.textContainer}>
        <img src={showcase} alt="showcase" className={ourStoryStyle.image} />
        {text.story.map((paragraph, index) => (
          <p key={index} className={ourStoryStyle.paragraph}>
            {paragraph}
          </p>
        ))}
        <p className={ourStoryStyle.sign}>{text.ourStory.sign}</p>
      </div>
      <div className={ourStoryStyle.staffContainer}>
        {text.staff.map((member, index) => (
          <TeamCard key={index} staff={member} index={index} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default OurStory;
