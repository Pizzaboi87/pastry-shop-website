import { useContext } from "react";
import { UserContext } from "../../context";
import { CourseCard, TransitionParent } from "../../components";
import { Theme_H1, titleStyle } from "../../styles";

const Courses = () => {
  const { text } = useContext(UserContext);

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.coursesTitle}
      </Theme_H1>
      <div className="w-full flex md:flex-row flex-col gap-4 items-center justify-center">
        {text.courses.map((course, index) => (
          <CourseCard key={course.title} course={course} index={index} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default Courses;
