import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { slideIn } from "../utils/motion";
import { Theme_Button, Theme_Motion_Div, courseCardStyle } from "../styles";

const CourseCard = ({ course, index }) => {
  const { text } = useContext(UserContext);
  const navigate = useNavigate();

  const motionPropsR = slideIn("right", index * 0.25);
  const [image, setImage] = useState(null);

  const loadImage = async () => {
    const { default: image } = await import(`../assets/${course.image}.webp`);
    return image;
  };

  useEffect(() => {
    loadImage().then(setImage);
  }, []);

  if (!image) {
    return null;
  }

  return (
    <Theme_Motion_Div
      $bgcolor="primary"
      initial={motionPropsR.initial}
      whileInView={motionPropsR.whileInView}
      viewport={motionPropsR.viewport}
      className={courseCardStyle.wrapper}
    >
      <div className={courseCardStyle.titleWrapper}>
        <h3 className={courseCardStyle.title}>{course.title}</h3>
        <div className={courseCardStyle.imageWrapper}>
          <img src={image} alt={course.alt} className={courseCardStyle.image} />
        </div>
      </div>
      <div className={courseCardStyle.detailsWrapper}>
        <p className={courseCardStyle.details}>{course.details}</p>
        <Theme_Button
          $bgcolor="logo"
          $textcolor="textlight"
          $bordercolor="transparent"
          $hoverbgcolor="dark"
          $hovertextcolor="textlight"
          className={courseCardStyle.button}
          onClick={() => navigate(`/courses/` + course.id)}
        >
          {text.courseCardButton}
        </Theme_Button>
      </div>
    </Theme_Motion_Div>
  );
};

export default CourseCard;
