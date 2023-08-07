import { useContext } from "react";
import { TeamCard, TransitionParent } from "../../components";
import { showcase } from "../../assets";
import { LanguageContext } from "../../context";
import { Theme_H1, titleStyle } from "../../styles";

const OurStory = () => {
  const { text } = useContext(LanguageContext);

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.ourStory.title}
      </Theme_H1>
      <div className="mb-10">
        <img
          src={showcase}
          alt="showcase"
          className="w-[30rem] float-right ml-6 mb-4 rounded-xl shadow-xl"
        />
        {text.story.map((paragraph, index) => (
          <p
            key={index}
            className="text-text 2xl:text-[1.25rem] text-[1.5rem] text-justify font-[400] mb-4"
          >
            {paragraph}
          </p>
        ))}
        <p className="text-text text-[2.5rem] font-[400] mb-4 font-letter">
          {text.ourStory.sign}
        </p>
      </div>
      <div className="w-full flex md:flex-row flex-col flex-wrap justify-between gap-8">
        {text.staff.map((member, index) => (
          <TeamCard key={index} staff={member} index={index} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default OurStory;
