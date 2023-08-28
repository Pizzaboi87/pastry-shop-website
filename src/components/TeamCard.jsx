import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { Theme_Div, teamCardStyle } from "../styles";

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
      className={teamCardStyle.wrapper}
    >
      <img src={image} alt="member" className={teamCardStyle.image} />
      <div className={teamCardStyle.filter} />
      <Theme_Div
        $bgcolor="glasscard"
        $bordercolor="transparent"
        className={teamCardStyle.content}
      >
        <span className={teamCardStyle.span}>
          <h1 className={teamCardStyle.name}>{staff.name}</h1>
          <h2 className={teamCardStyle.job}>{staff.title}</h2>
        </span>
        <div className={teamCardStyle.socialWrapper}>
          {staff.social.map((social, index) => (
            <Link
              key={index}
              to={social.link}
              target="_blank"
              className={teamCardStyle.link}
            >
              <Icon icon={social.icon} className={teamCardStyle.icon} />
            </Link>
          ))}
        </div>
      </Theme_Div>
    </motion.div>
  );
};

export default TeamCard;
