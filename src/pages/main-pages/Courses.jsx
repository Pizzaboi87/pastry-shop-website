import { UserContext } from "../../context";
import { CourseCard, TransitionParent } from "../../components";
import { useContext } from "react";
import { Theme_H1, coursesStyle, titleStyle } from "../../styles";

const Courses = () => {
  const { text } = useContext(UserContext);

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.coursesTitle}
      </Theme_H1>
      <div className={coursesStyle.container}>
        {text.courses.map((course, index) => (
          <CourseCard key={course.title} course={course} index={index} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default Courses;
