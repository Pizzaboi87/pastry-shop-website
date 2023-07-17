import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courses } from "../constants";
import { CourseForm } from "../components";

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
		<div className="mt-56 w-full flex flex-col items-center">
			<div className="w-[75%] bg-white rounded-xl p-12 flex flex-col">
				<h1 className="text-4xl text-center text-text font-[500] mb-8">
					{course.title}
				</h1>
				{course.longDetails &&
					course.longDetails.map((detail, index) => {
						if (Array.isArray(detail)) {
							return (
								<div
									key={index}
									className="flex items-center justify-center gap-16 mb-8"
								>
									<span className="flex flex-col gap-16">
										<img
											src={images[index]}
											alt="course-picture"
											className="w-[30rem]"
										/>
										<img
											src={images[index + 2]}
											alt="course-picture"
											className="w-[30rem]"
										/>
									</span>
									<ul className="list-disc pl-6 mb-8 w-[60rem]">
										{detail.map((item, itemIndex) => (
											<li
												key={itemIndex}
												className={`text-text text-lg font-[400] text-justify ${
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
									className="flex items-center justify-center gap-16"
								>
									<p className="text-text text-lg text-justify font-[400] mb-8">
										{detail}
									</p>
									<img
										src={images[index]}
										alt="course-picture"
										className="w-[30rem] mb-8"
									/>
								</div>
							);
						}
					})}
				<CourseForm courses={courses} />
			</div>
		</div>
	);
};

export default CoursePage;
