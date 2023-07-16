import { TeamCard } from "../components";

const OurStory = () => {
	return (
		<div className="mt-56 flex flex-col w-full items-center">
			<div className="flex w-[85%] justify-around bg-white p-12">
				<TeamCard />
				<TeamCard />
				<TeamCard />
				<TeamCard />
			</div>
		</div>
	);
};

export default OurStory;
