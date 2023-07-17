import { TeamCard } from "../components";
import { staff } from "../constants";

const OurStory = () => {
	return (
		<div className="mt-56 w-[85%] flex flex-col items-center">
			<div className="bg-white rounded-xl p-8 flex flex-col items-center">
				<h1 className="text-brown text-[3rem] font-[400] mb-8">Our Team</h1>
				<div className="w-full flex justify-between gap-8">
					{staff.map((member, index) => (
						<TeamCard key={index} staff={member} index={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default OurStory;
