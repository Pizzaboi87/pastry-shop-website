import { CourseCard } from '../components';
import { courses } from '../constants';

const Courses = () => {
	return (
		<div className="mt-56 w-[85%] flex flex-col items-center">
			<div className="bg-white rounded-xl p-8 flex flex-col items-center">
				<h1 className="text-brown text-[3rem] font-[400] mb-8">Our Courses</h1>
				<div className="w-full flex justify-between gap-8">
					{courses.map((course, index) => (
						<CourseCard key={course.title} course={course} index={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Courses;
