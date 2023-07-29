import { stop } from "../assets";
import TransitionParent from "./TransitionParent";

const NoPermission = () => {
	return (
		<TransitionParent isFlex>
			<h1 className="text-brown xl:text-[2rem] text-[2rem] font-[600] mb-8">
				You do not have permission to view this page.
			</h1>
			<img src={stop} alt="stop" className="w-[15rem]" />
		</TransitionParent>
	);
};

export default NoPermission;
