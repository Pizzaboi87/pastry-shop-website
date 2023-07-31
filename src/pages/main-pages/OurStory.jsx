import { TeamCard, TransitionParent } from "../../components";
import { otherText, staff, story } from "../../constants";
import { showcase } from "../../assets";

const OurStory = () => {
  return (
    <TransitionParent isFlex>
      <h1 className="xl:text-[3rem] text-[2rem] text-center text-text font-[600] mb-8">
        {otherText.ourStory.title}
      </h1>
      <div className="mb-10">
        <img
          src={showcase}
          alt="showcase"
          className="w-[30rem] float-right ml-6 mb-4 rounded-xl shadow-xl"
        />
        {story.map((paragraph, index) => (
          <p
            key={index}
            className="text-text 2xl:text-[1.25rem] text-[1.5rem] text-justify font-[400] mb-4"
          >
            {paragraph}
          </p>
        ))}
        <p className="text-text text-[2.5rem] font-[400] mb-4 font-letter">
          {otherText.ourStory.sign}
        </p>
      </div>
      <div className="w-full flex md:flex-row flex-col flex-wrap justify-between gap-8">
        {staff.map((member, index) => (
          <TeamCard key={index} staff={member} index={index} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default OurStory;
