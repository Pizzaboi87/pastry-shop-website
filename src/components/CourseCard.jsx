import { motion } from 'framer-motion';
import { slideIn } from '../utils/motion';
import { torta } from '../assets';

const CourseCard = ({ index }) => {
	const motionPropsR = slideIn('right', index * 0.25);

	return (
		<motion.div
			initial={motionPropsR.initial}
			whileInView={motionPropsR.whileInView}
			viewport={motionPropsR.viewport}
			className="max-w-[20rem] text-justify bg-pinklight p-4 rounded-[15px] shadow-xl flex flex-col items-center"
		>
			<h3 className="mb-4 text-text text-[1.3rem] font-[500]">Baking Course</h3>
			<img src={torta} className="w-[300px] mb-4" />
			<p className="text-text text-justify mb-4">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet
				diam rutrum nulla dapibus, sed commodo enim tincidunt. Nullam sodales
				iaculis tincidunt.
			</p>
			<button className="px-3 py-2 bg-logopink hover:bg-pinkdark text-[1rem] text-white font-[400] rounded-[15px] shadow-xl">
				Learn More
			</button>
		</motion.div>
	);
};

export default CourseCard;
