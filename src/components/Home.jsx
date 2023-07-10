import { macaron, eclair } from '../assets';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<div className="w-full flex items-center justify-center mt-48">
				<span className="w-[35%] text-brown px-8">
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
				</span>
				<img
					src={macaron}
					alt="macaron"
					className="w-[40%] rounded-[25px] shadow-xl"
				/>
			</div>

			<div className="w-full flex items-center justify-center mt-48">
				<img
					src={eclair}
					alt="eclair"
					className="w-[35%] rounded-[25px] shadow-xl"
				/>
				<div className="text-justify max-w-[40%] pl-24 text-[18px] leading-10">
					<p>
						Welcome to Le Ciel Sucré, where passion and quality converge in the
						splendid world of French pastry. We believe that desserts are not
						just simple delicacies, but works of art that offer sensory
						experiences in every bite. Each of our cakes and desserts is crafted
						by expert hands, as we strive for the highest level of excellence
						and dedication to the traditional French patisserie.
					</p>

					<p>
						Our history stretches back for a long time, and we proudly carry on
						the rich pastry heritage of our city. We are deeply connected to our
						city and aim to pay homage to the masters of French pastry who have
						created the art of achieving unparalleled flavors and refinement
						over the centuries. Our expertise and commitment lie in authentic
						recipes, the use of fresh and high-quality ingredients, and
						meticulous workmanship.
					</p>
				</div>
			</div>

			<div className="w-full flex items-center justify-center mt-48 pb-48">
				<div className="text-justify max-w-[40%] pr-24 text-[18px] leading-10">
					<p>
						At Le Ciel Sucré, every pastry, cake, and baked treat is created
						with the purpose of bringing happiness and joy into our lives. The
						perfect balance of unique creativity and elegance can be found in
						our marvelous flavors and stunning presentations. Our establishment
						encompasses all the beauty and enchantment of the art of French
						patisserie while incorporating modern tastes and trends to awe our
						visitors.
					</p>

					<p>
						It is our pleasure to share this exceptional patisserie and our
						delicacies with you. Delight in the sweet temptation and immerse
						yourself in the world of flavors and textures that only Le Ciel
						Sucré offers. Become a part of our traditions and beloved pastry
						heritage as you honor us with your visit.
					</p>
				</div>
				<img
					src={macaron}
					alt="macaron"
					className="w-[40%] rounded-[25px] shadow-xl"
				/>
			</div>
		</>
	);
};

export default Home;
