import { stamp } from "../assets";
import { stampStyle } from "../styles";

const Postcard = () => {
	return (
		<div className="rotate-90 md:rotate-0 w-full md:px-12">
			<div className="grid md:w-full w-[120%] bg-white grid-cols-2 md:mb-16">
				<div className="-rotate-90 w-[90vw] md:w-auto h-auto md:rotate-0 md:border-r-2 border-b-2 md:border-b-0 border-logopink md:my-4 md:px-16 md:py-4">
					<p className="font-letter text-text md:text-[2.2rem] text-[1.2rem] md:my-8 my-2">
						Dear Le Ciel Sucré,
					</p>
					<p className="font-letter text-text md:text-[2.2rem] text-[1.2rem] md:mb-8 my-2">
						I just wanted to let you know how much I enjoyed the cakes I ordered
						for my birthday. My friends and family all loved them, and they
						especially raved about the chocolate cake. Thank you for the high
						quality products and excellent service.
					</p>
					<p className="font-letter text-text md:text-[2.2rem] text-[1.2rem] md:mb-16 mb-4">
						Best regards,
						<br />
						Mary
					</p>
					<p className="font-letter text-text md:text-[2.2rem] text-[1.2rem]">
						PS: We'll be back tomorrow!
					</p>
				</div>

				<div className="w-full h-full flex flex-col items-center pb-24 pt-8">
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
					<div className="h-[75%] w-full flex flex-col items-center justify-center gap-6">
						<div className="w-[70%] border-b-4 border-logopink">
							<p className="font-letter text-text md:text-[2.7rem] text-[1.4rem] ml-8">
								Le Ciel Sucré
							</p>
						</div>
						<div className="w-[70%] border-b-4 border-logopink">
							<p className="font-letter text-text md:text-[2.7rem] text-[1.4rem] ml-8">
								46 Rue Duvivier
							</p>
						</div>
						<div className="w-[70%] border-b-4 border-logopink">
							<p className="font-letter text-text md:text-[2.7rem] text-[1.4rem] ml-8">
								Paris, France
							</p>
						</div>
						<div className="w-[70%] flex gap-4">
							{[7, 5, 0, 0, 7].map((number, index) => (
								<div
									key={index}
									className="border-4 border-logopink w-[3rem] h-[4rem] text-center"
								>
									<p className="font-letter text-text text-[2.2rem]">
										{number}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Postcard;
