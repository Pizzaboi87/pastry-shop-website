import { stamp } from "../assets";
import { postCard } from "../constants";
import { postcardStyle, stampStyle } from "../styles";

const Postcard = () => {
	return (
		<div className="hidden xs:flex sm:w-[90%] ms:w-[75%] bg-white sm:flex-row flex-col xs:mb-24">
			<div className="sm:w-[50%] sm:p-8 p-2 pb-10 sm:my-4 sm:mx-0 mx-4 sm:border-r-2 border-r-0 sm:border-b-0 border-b-2 border-logopink">
				<p className={`${postcardStyle.message} lg:my-8 sm:my-4 my-2`}>
					{postCard.message.addresse}
				</p>
				<p className={`${postcardStyle.message} lg:mb-8 sm:mb-8 my-2`}>
					{postCard.message.message}
				</p>
				<p className={`${postcardStyle.message} lg:mb-16 sm:mb-8 mb-4`}>
					{postCard.message.senderStart}
					<br />
					{postCard.message.senderEnd}
				</p>
				<p className={postcardStyle.message}>{postCard.message.ps}</p>
			</div>

			<div className="sm:w-[50%] sm:rotate-0 rotate-90 flex flex-col items-center sm:pb-24 pb-2 sm:pt-8 pt-0">
				<div
					className="lg:w-[12.5rem] md:w-[7.5rem] w-[6.25rem] xl:h-[10rem] lg:h-[11.3rem] md:h-[5.5rem] h-[5rem] relative lg:self-end lg:mr-8 lg:ml-0 ml-36"
					style={stampStyle}
				>
					<div className={postcardStyle.stampImage} />
					<img
						src={stamp}
						alt="stamp"
						className="absolute w-full lg:bottom-[-2rem] bottom-[-1rem] lg:left-[-2rem] left-[-1rem]"
					/>
				</div>
				<div className="h-[75%] w-full flex flex-col items-center justify-center gap-6">
					<div className={postcardStyle.addressWrapper}>
						<p className={postcardStyle.address}>{postCard.address.name}</p>
					</div>
					<div className={postcardStyle.addressWrapper}>
						<p className={postcardStyle.address}>{postCard.address.street}</p>
					</div>
					<div className={postcardStyle.addressWrapper}>
						<p className={postcardStyle.address}>{postCard.address.city}</p>
					</div>
					<div className="sm:w-[70%] ms:w-[45%] w-[60%] flex gap-4">
						{postCard.address.zip.map((number, index) => (
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
