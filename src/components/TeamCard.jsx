import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";

const TeamCard = ({ staff, index }) => {
  const motionPropsR = slideIn("right", index * 0.25);
  const [image, setImage] = useState(null);

  const loadImage = async () => {
    const { default: image } = await import(`../assets/${staff.image}.webp`);
    return image;
  };

  useEffect(() => {
    loadImage().then(setImage);
  }, []);

  if (!image) {
    return null;
  }

  return (
    <motion.div
      initial={motionPropsR.initial}
      whileInView={motionPropsR.whileInView}
      viewport={motionPropsR.viewport}
      className="card relative mx-auto xl:w-[18rem] 3xl:w-[20rem] w-[20rem] h-[30rem] overflow-hidden rounded-xl shadow-xl"
    >
      <img src={image} alt="member" className="h-full object-cover absolute" />
      <div className="filter absolute w-full h-[30rem] bg-[#fcdfda88]"></div>
      <div className="info absolute w-full h-[10rem] bg-[#e45a84cc] bottom-0 flex flex-col items-center justify-between">
        <span className="flex flex-col items-center pt-8">
          <h1 className="text-white font-[800] text-[1.4rem]">{staff.name}</h1>
          <h2 className="text-white font-[600] text-[1.2rem]">{staff.title}</h2>
        </span>
        <div className="w-full flex gap-2 items-center justify-end justify-self-end py-4 pr-4">
          {staff.social.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              className="social w-[2.5rem] h-[2.5rem] flex items-center justify-center"
            >
              <Icon
                icon={social.icon}
                className="icon text-white text-[1.8rem]"
              />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
