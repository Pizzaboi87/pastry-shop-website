import { TeamCard } from "../components";
import { staff } from "../constants";

const OurStory = () => {
	return (
		<div className="mt-56 flex flex-col w-full items-center">
			<div className="flex w-[85%] justify-around bg-white p-12">
				{staff.map((member, index) => (
					<TeamCard key={index} staff={member} />
				))}
			</div>
		</div>
	);
};

export default OurStory;
