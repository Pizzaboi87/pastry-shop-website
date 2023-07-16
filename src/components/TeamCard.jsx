import { course1 } from "../assets";

const TeamCard = () => {
	return (
		<div className="card relative w-[20rem] h-[30rem] overflow-hidden rounded-xl">
			<img
				src={course1}
				alt="member"
				className="h-full object-cover absolute"
			/>
			<div className="filter absolute w-full h-[30rem] bg-[#fcdfda88]"></div>
			<div className="info absolute w-full h-[10rem] bg-[#e45a84cc] bottom-0 flex flex-col items-center justify-center">
				<h1 className="text-white font-[800] text-[1.2rem]">Member Name</h1>
				<h2 className="text-white font-[600] text-[1rem]">Member Title</h2>
			</div>
		</div>
	);
};

export default TeamCard;
