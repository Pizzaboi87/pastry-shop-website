import { Fragment } from "react";
import { shadowStyle } from "../styles";

const Awning = () => {
	const n = Math.ceil(window.innerWidth / 160);
	const awnings = [...Array(n)].map((_, i) => (
		<Fragment key={i}>
			<div className="piece w-[80px] h-full bg-pinklight rounded-b-full shadow-xl">
				<div className="w-full h-full rounded-b-full" style={shadowStyle} />
			</div>
			<div className="piece w-[80px] h-full bg-logopink rounded-b-full shadow-xl">
				<div className="w-full h-full rounded-b-full" style={shadowStyle} />
			</div>
		</Fragment>
	));

	return (
		<div className="w-full h-[3.5rem] fixed top-0 left-0 z-[11] flex">
			{awnings}
		</div>
	);
};

export default Awning;
