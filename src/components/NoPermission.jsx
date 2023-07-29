import { stop } from "../assets";
import { otherText } from "../constants";
import TransitionParent from "./TransitionParent";

const NoPermission = () => {
	return (
		<TransitionParent isFlex>
			<h1 className="text-brown xl:text-[2rem] text-[2rem] font-[600] mb-8">
				{otherText.noPermissionTitle}
			</h1>
			<img src={stop} alt="stop" className="w-[15rem]" />
		</TransitionParent>
	);
};

export default NoPermission;
