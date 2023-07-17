import { stamp } from "../assets";
import { stampStyle } from "../styles";

const Postcard = () => {
	return ( 
		<div className="w-full px-12">
			<div className="grid w-full bg-white grid-cols-2 mb-16">
				<div className="border-r-2 border-logopink my-8 py-8 px-16">
					<p className="font-letter text-text text-[2.2rem] my-8">
						Dear Le Ciel Sucré,
					</p>
					<p className="font-letter text-text text-[2.2rem] mb-8">
						I just wanted to let you know how much I enjoyed the cakes I ordered
						for my birthday. My friends and family all loved them, and they
						especially raved about the chocolate cake. Thank you for the high
						quality products and excellent service.
					</p>
					<p className="font-letter text-text text-[2.2rem] mb-16">
						Best regards,
						<br />
						Mary
					</p>
					<p className="font-letter text-text text-[2.2rem]">
						PS: We'll be back tomorrow!
					</p>
				</div>

				<div className="w-full h-full flex flex-col items-center justify-around pb-48">
					<div
						className="w-[12.5rem] h-[10rem] relative self-end mr-8"
						style={stampStyle}
					>
						<div className="absolute border-[0.3125rem] border-logopink top-2 left-2 w-[11.5rem] h-[9rem] bg-stamp bg-cover" />
						<img
							src={stamp}
							alt="stamp"
							className="absolute w-full bottom-[-2rem] left-[-2rem]"
						/>
					</div>
					<div className="w-[80%] border-b-4 border-logopink">
						<p className="font-letter text-text text-[2.7rem] ml-8">
							Le Ciel Sucré
						</p>
					</div>
					<div className="w-[80%] border-b-4 border-logopink">
						<p className="font-letter text-text text-[2.7rem] ml-8">
							46 Rue Duvivier
						</p>
					</div>
					<div className="w-[80%] border-b-4 border-logopink">
						<p className="font-letter text-text text-[2.7rem] ml-8">
							Paris, France
						</p>
					</div>
					<div className="w-[80%] flex gap-4">
						{[7, 5, 0, 0, 7].map((number, index) => (
							<div
								key={index}
								className="border-4 border-logopink w-[3rem] h-[4rem] text-center"
							>
								<p className="font-letter text-text text-[2.2rem]">{number}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Postcard;
