import { macaron } from '../assets';

const Home = () => {
	return (
		<div className="w-full flex items-center justify-center gap-24 mt-48">
			<div className="w-[30%] text-brown">
				<h1 className="text-[4.5rem] font-[300]">
					Savor
					<br />
					the Art of
					<br />
					French Pastries!
				</h1>
				<p>
					Marvel as the sweet flavors enchant, Le Ciel Sucré, where French
					masters create.
					<br />
					Taste the passion in bite-sized wonders, where sweet pleasures come
					alive.
				</p>
			</div>
			<img
				src={macaron}
				alt="macaron"
				className="w-[30%] rounded-[25px] shadow-xl"
			/>
		</div>
	);
};

export default Home;
