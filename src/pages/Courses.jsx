import { CourseCard } from "../components";
import { courses } from "../constants";

const Courses = () => {
  return (
    <div className="md:mt-56 mt-36 xl:w-[90%] 3xl:w-[80%] w-full bg-glass glass rounded-xl flex flex-col items-center shadow-xl md:p-12 p-4">
      <h1 className="text-text xl:text-[3rem] text-[2rem] font-[600] mb-8">
        Our Courses
      </h1>
      <div className="w-full flex md:flex-row flex-col gap-4 items-center justify-center">
        {courses.map((course, index) => (
          <CourseCard key={course.title} course={course} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
