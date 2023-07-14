import { useParams } from "react-router-dom";
import { courses } from "../constants";

const CoursePage = () => {
  const { id } = useParams();

  let course = courses.filter((course) => course.id === id)[0];

  return (
    <div className="mt-56 w-[85%] h-[300vh] flex flex-col items-center">
      <h1 className="text-4xl text-center text-text font-[500]">
        {course.title}
      </h1>
    </div>
  );
};

export default CoursePage;
