import { Fragment } from 'react';

const Awning = () => {
	const n = window.innerWidth / 160;
	const awnings = [...Array(n)].map((_, i) => (
		<Fragment key={i}>
			<div className="piece w-[80px] h-full bg-primary rounded-b-full shadow-xl"></div>
			<div className="piece w-[80px] h-full bg-pinklight rounded-b-full shadow-xl"></div>
		</Fragment>
	));

	return (
		<div className="w-full h-[3.5rem] fixed top-0 left-0 z-[11] flex">
			{awnings}
		</div>
	);
};

export default Awning;
