import { stamp } from "../assets";
import { stampStyle } from "../styles";

const Postcard = () => {
	return (
		<div className="hidden xs:flex sm:w-[90%] ms:w-[75%] bg-white sm:flex-row flex-col">
			<div className="sm:w-[50%] sm:p-8 p-2 pb-10 sm:my-4 sm:mx-0 mx-4 sm:border-r-2 border-r-0 sm:border-b-0 border-b-2 border-logopink">
				<p className="font-letter text-text xl:text-[2.2rem] sm:text-[1.3rem] text-[1rem] lg:my-8 sm:my-4 my-2">
					Dear Le Ciel Sucré,
				</p>
				<p className="font-letter text-text xl:text-[2.2rem] sm:text-[1.3rem] text-[1rem] lg:mb-8 sm:mb-8 my-2">
					I just wanted to let you know how much I enjoyed the cakes I ordered
					for my birthday. My friends and family all loved them, and they
					especially raved about the chocolate cake. Thank you for the high
					quality products and excellent service.
				</p>
				<p className="font-letter text-text xl:text-[2.2rem] sm:text-[1.3rem] text-[1rem] lg:mb-16 sm:mb-8 mb-4">
					Best regards,
					<br />
					Mary
				</p>
				<p className="font-letter text-text xl:text-[2.2rem] sm:text-[1.3rem] text-[1rem]">
					PS: We'll be back tomorrow!
				</p>
			</div>

			<div className="sm:w-[50%] sm:rotate-0 rotate-90 flex flex-col items-center sm:pb-24 pb-2 sm:pt-8 pt-0">
				<div
					className="lg:w-[12.5rem] md:w-[7.5rem] w-[6.25rem] xl:h-[10rem] lg:h-[11.3rem] md:h-[5.5rem] h-[5rem] relative lg:self-end lg:mr-8 lg:ml-0 ml-36"
					style={stampStyle}
				>
					<div className="absolute lg:border-[0.3125rem] md:border-[0.2rem] border-[0.15rem] border-logopink lg:top-2 md:top-[0.75rem] top-[0.5rem] lg:left-2 left-[0.5rem] lg:w-[11.5rem] md:w-[6.5rem] w-[5.25rem] lg:h-[9rem] h-[4rem] bg-stamp bg-cover" />
					<img
						src={stamp}
						alt="stamp"
						className="absolute w-full lg:bottom-[-2rem] bottom-[-1rem] lg:left-[-2rem] left-[-1rem]"
					/>
				</div>
				<div className="h-[75%] w-full flex flex-col items-center justify-center gap-6">
					<div className="sm:w-[70%] ms:w-[45%] w-[60%] border-b-4 border-logopink">
						<p className="font-letter text-text xl:text-[2.7rem] sm:text-[1.8rem] text-[1.4rem] ml-8">
							Le Ciel Sucré
						</p>
					</div>
					<div className="sm:w-[70%] ms:w-[45%] w-[60%] border-b-4 border-logopink">
						<p className="font-letter text-text xl:text-[2.7rem] sm:text-[1.8rem] text-[1.4rem] ml-8">
							46 Rue Duvivier
						</p>
					</div>
					<div className="sm:w-[70%] ms:w-[45%] w-[60%] border-b-4 border-logopink">
						<p className="font-letter text-text xl:text-[2.7rem] sm:text-[1.8rem] text-[1.4rem] ml-8">
							Paris, France
						</p>
					</div>
					<div className="sm:w-[70%] ms:w-[45%] w-[60%] flex gap-4">
						{[7, 5, 0, 0, 7].map((number, index) => (
							<div
								key={index}
								className="border-4 border-logopink lg:w-[3rem] sm:[2.2rem] w-[2rem] md:h-[4rem] sm:h-[3rem] h-[2.5rem] text-center"
							>
								<p className="font-letter text-text lg:text-[2.2rem] sm:text-[1.8rem] text-[1.5rem]">
									{number}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Postcard;
