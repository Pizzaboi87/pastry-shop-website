import { macaron } from '../assets';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="w-full flex items-center justify-center mt-48">
			<div className="w-[35%] text-brown">
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
				<Link to="login">
					<button className="bg-button px-8 py-2 mt-6 rounded-[15px] text-[1.3rem] text-white shadow-sm font-[500] border-none hover:bg-pinkdark">
						EXPLORE NOW
					</button>
				</Link>
			</div>
			<img
				src={macaron}
				alt="macaron"
				className="w-[40%] rounded-[25px] shadow-xl"
			/>
		</div>
	);
};

export default Home;
