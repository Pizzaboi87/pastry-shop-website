import { Link } from 'react-router-dom';
import { footerLinks } from '../constants/';
import { logo } from '../assets/';

const Footer = () => {
	return (
		<footer className="w-full flex flex-col mt-24 rounded-t-[2rem] bg-pinklight text-text">
			<div className="flex flex-wrap justify-between items-center px-20 py-4">
				<div className="flex flex-col items-center justify-center">
					<img
						src={logo}
						alt="logo"
						width={118}
						height={18}
						className="object-contain"
					/>
					<p className="font-[300] text-[1rem]">
						2023 Le Ciel Sucré&copy; <br /> All rights reserved.
					</p>
				</div>
				<div className="flex w-[50%] justify-between">
					{footerLinks.map((link) => (
						<div key={link.title} className="flex flex-col leading-8">
							<h3 className="font-[600] text-[1.2rem] text-logopink">
								{link.title}
							</h3>
							{link.links.map((item) => (
								<Link
									key={item.title}
									href={item.url}
									className="font-[300] text-[1rem] hover:text-logopink"
								>
									{item.title}
								</Link>
							))}
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-end flex-wrap sm:px-16 px-6 py-4 border-t-2 border-dotted border-red">
				<span className="flex gap-4 font-[300] text-[1rem]">
					<Link href="/">Privacy Policy</Link>
					<Link href="/">Terms of Use</Link>
				</span>
			</div>
		</footer>
	);
};

export default Footer;
