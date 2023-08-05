import { CourseCard, TransitionParent } from "../../components";
import { courses, otherText } from "../../constants";
import { Theme_H1, titleStyle } from "../../styles";

const Courses = () => {
  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {otherText.coursesTitle}
      </Theme_H1>
      <div className="w-full flex md:flex-row flex-col gap-4 items-center justify-center">
        {courses.map((course, index) => (
          <CourseCard key={course.title} course={course} index={index} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default Courses;
