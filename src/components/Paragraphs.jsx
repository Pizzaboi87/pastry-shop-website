import { motion } from 'framer-motion';
import { slideIn } from '../utils/motion';

const Paragraphs = ({ dirText, imgFirst, text }) => {
	const motionProps = slideIn(dirText);

	return (
		<motion.span
			initial={motionProps.initial}
			whileInView={motionProps.whileInView}
			viewport={motionProps.viewport}
			className={`${
				imgFirst ? 'ml-24' : 'ml-0'
			} text-justify max-w-[40%] text-[18px] leading-9`}
		>
			{text.map((paragraph, index) => (
				<p key={`${paragraph[0]}-${index}`} className="my-2">
					{paragraph}
				</p>
			))}
		</motion.span>
	);
};

export default Paragraphs;
