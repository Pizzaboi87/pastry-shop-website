import { UserContext } from "../../context";
import { CourseForm, TransitionParent } from "../../components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { course1, course2, course3 } from "../../assets";
import { Theme_H1, coursePageStyle, titleStyle } from "../../styles";

const CoursePage = () => {
  const { text } = useContext(UserContext);

  const { id } = useParams();
  let course = text.courses.filter((course) => course.id === id)[0];

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [images, setImages] = useState([]);

  const loadImage = async (imageName) => {
    const { default: image } = await import(`../../assets/${imageName}.webp`);
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
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {course.title}
      </Theme_H1>
      {course.longDetails &&
        course.longDetails.map((detail, index) => {
          if (Array.isArray(detail)) {
            return (
              <div key={index} className={coursePageStyle.arrayContainer}>
                <span className={coursePageStyle.imageSpan}>
                  <img
                    src={images[index]}
                    alt="course-picture"
                    className={coursePageStyle.imageFirst}
                  />
                  <img
                    src={images[index + 2]}
                    alt="course-picture"
                    className={coursePageStyle.imageSecond}
                  />
                </span>
                <ul className={coursePageStyle.list}>
                  {detail.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`${coursePageStyle.listItem} ${
                        itemIndex === 0 ? coursePageStyle.firstItem : ""
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
              <div key={index} className={coursePageStyle.notArrayContainer}>
                <img
                  src={images[index]}
                  alt="course-picture"
                  className={coursePageStyle.imageRegular}
                />
                <p className={coursePageStyle.paragraph}>{detail}</p>
              </div>
            );
          }
        })}
      <div className={coursePageStyle.formContainer}>
        <div className={coursePageStyle.imageContainer}>
          <img src={course1} alt="course_1" />
          <img src={course2} alt="course_2" />
          <img src={course3} alt="course_3" />
        </div>
        <CourseForm courses={text.courses} />
      </div>
    </TransitionParent>
  );
};

export default CoursePage;
