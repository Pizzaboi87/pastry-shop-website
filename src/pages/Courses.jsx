import { CourseCard } from '../components';

const Courses = () => {
	return (
		<div className="mt-56 w-[85%] flex flex-col items-center">
			<div className="w-[85%] bg-white rounded-xl p-8 flex flex-col items-center gap-8">
				<h1 className="text-brown text-[3rem] font-[400]">Our Courses</h1>
				<div className="w-full flex justify-between">
					<CourseCard index={0} />
					<CourseCard index={1} />
					<CourseCard index={2} />
					<CourseCard index={3} />
				</div>
			</div>
		</div>
	);
};

export default Courses;
