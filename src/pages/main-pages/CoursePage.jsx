import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courses } from "../../constants";
import { CourseForm, TransitionParent } from "../../components";

const CoursePage = () => {
  const { id } = useParams();
  let course = courses.filter((course) => course.id === id)[0];

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [images, setImages] = useState([]);

  const loadImage = async (imageName) => {
    const { default: image } = await import(`../assets/${imageName}.webp`);
    return image;
  };

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = course.imageArray.map((imageName) =>
        loadImage(imageName)
      );
      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  if (!imagesLoaded) {
    return null;
  }

  return (
    <TransitionParent isFlex>
      <h1 className="xl:text-[3rem] text-[2rem] text-center text-text font-[600] mb-8">
        {course.title}
      </h1>
      {course.longDetails &&
        course.longDetails.map((detail, index) => {
          if (Array.isArray(detail)) {
            return (
              <div
                key={index}
                className="flex md:flex-row flex-col items-center justify-center xl:gap-16 mb-8"
              >
                <span className="flex flex-col gap-8 xl:gap-12">
                  <img
                    src={images[index]}
                    alt="course-picture"
                    className="3xl:w-[60rem] md:w-[30rem] w-full"
                  />
                  <img
                    src={images[index + 2]}
                    alt="course-picture"
                    className="3xl:w-[60rem] md:w-[30rem] w-full mb-6"
                  />
                </span>
                <ul className="list-disc pl-4 xl:mb-8 xl:w-[60rem] w-full ml-4 pr-4">
                  {detail.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`text-text 2xl:text-[1.25rem] text-[1.5rem] font-[400] text-justify ${
                        itemIndex === 0 ? "font-[600] list-none" : ""
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="xl:flex md:flex-row-reverse flex-col items-center justify-center text-justify mb-8"
              >
                <img
                  src={images[index]}
                  alt="course-picture"
                  className="xl:w-[30rem] md:w-[20rem] w-full mb-8 md:float-right md:ml-8"
                />
                <p className="text-text 2xl:text-[1.25rem] text-[1.5rem] font-[400] mb-8 inline">
                  {detail}
                </p>
              </div>
            );
          }
        })}
      <CourseForm courses={courses} />
    </TransitionParent>
  );
};

export default CoursePage;