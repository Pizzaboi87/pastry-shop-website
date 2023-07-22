import { TeamCard } from "../components";
import { staff, story } from "../constants";
import { showcase } from "../assets";

const OurStory = () => {
	return (
		<div className="md:mt-56 mt-36 xl:w-[90%] 3xl:w-[80%] w-full flex flex-col items-center">
			<div className="w-full bg-pinktransparent rounded-xl md:p-12 p-4 flex flex-col items-center">
				<h1 className="text-brown xl:text-[3rem] text-[2rem] font-[400] mb-8">
					Our Story
				</h1>
				<div className="mb-10">
					<img
						src={showcase}
						alt="showcase"
						className="w-[30rem] float-right ml-6 mb-4 rounded-xl shadow-xl"
					/>
					{story.map((paragraph, index) => (
						<p
							key={index}
							className="text-text 2xl:text-[1.25rem] text-[1.5rem] text-justify font-[400] mb-4"
						>
							{paragraph}
						</p>
					))}
					<p className="text-text text-[2.5rem] font-[400] mb-4 font-letter">
						Le Ciel Sucré Team
					</p>
				</div>
				<div className="w-full flex md:flex-row flex-col flex-wrap justify-between gap-8">
					{staff.map((member, index) => (
						<TeamCard key={index} staff={member} index={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default OurStory;
