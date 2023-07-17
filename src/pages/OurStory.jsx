import { TeamCard } from "../components";
import { staff, story } from "../constants";
import { showcase } from "../assets";

const OurStory = () => {
	return (
		<div className="mt-56 w-[75%] flex flex-col items-center">
			<div className="bg-white rounded-xl p-12 flex flex-col items-center">
				<h1 className="text-brown text-[3rem] font-[400] mb-8">Our Story</h1>
				<div className="mb-10">
					<img
						src={showcase}
						alt="showcase"
						className="w-[30rem] float-right ml-6 mb-4 rounded-xl shadow-xl"
					/>
					{story.map((paragraph, index) => (
						<p
							key={index}
							className="text-text text-lg text-justify font-[400] mb-4"
						>
							{paragraph}
						</p>
					))}
					<p className="text-text text-[2.5rem] font-[400] mb-4 font-letter">
						Le Ciel Sucré Team
					</p>
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
