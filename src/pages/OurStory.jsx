import { TeamCard } from "../components";
import { staff, story } from "../constants";
import { macaron } from "../assets";

const OurStory = () => {
	return (
		<div className="mt-56 w-[75%] flex flex-col items-center">
			<div className="bg-white rounded-xl p-8 flex flex-col items-center">
				<h1 className="text-brown text-[3rem] font-[400] mb-8">Our Story</h1>
				<div>
					<img
						src={macaron}
						alt="test"
						className="w-[30rem] float-right pl-4"
					/>
					{story.map((paragraph, index) => (
						<p
							key={index}
							className="text-text text-lg text-justify font-[400] mb-4"
						>
							{paragraph}
						</p>
					))}
				</div>
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
