import { CourseCard, TransitionParent } from "../../components";
import { courses } from "../../constants";

const Courses = () => {
  return (
    <TransitionParent isFlex>
      <h1 className="text-text xl:text-[3rem] text-[2rem] font-[600] mb-8">
        Our Courses
      </h1>
      <div className="w-full flex md:flex-row flex-col gap-4 items-center justify-center">
        {courses.map((course, index) => (
          <CourseCard key={course.title} course={course} index={index} />
        ))}
      </div>
    </TransitionParent>
  );
};

export default Courses;
