import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";

const Image = ({ dirPic, image, imgFirst }) => {
	const motionProps = slideIn(dirPic);

	return (
		<motion.img
			initial={motionProps.initial}
			whileInView={motionProps.whileInView}
			viewport={motionProps.viewport}
			src={image}
			alt={image}
			className={`${
				imgFirst ? "ml-0" : "2xl:ml-24"
			} md:w-[80%] xl:w-[40%] w-[100%] mt-8 rounded-3xl shadow-xl`}
		/>
	);
};

export default Image;
