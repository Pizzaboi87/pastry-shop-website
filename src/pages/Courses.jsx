import { CourseCard } from "../components";
import { courses } from "../constants";

const Courses = () => {
  return (
    <div className="md:mt-56 mt-36 w-full flex flex-col items-center">
      <div className="md:bg-white rounded-xl md:p-16 flex flex-col items-center">
        <h1 className="text-brown xl:text-[3rem] text-[2rem] font-[400] mb-8">
          Our Courses
        </h1>
        <div className="w-full flex md:flex-row flex-col gap-4 md:flex-wrap items-center justify-center">
          {courses.map((course, index) => (
            <CourseCard key={course.title} course={course} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
