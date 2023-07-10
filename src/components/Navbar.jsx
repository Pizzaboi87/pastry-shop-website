import { navLinksLeft, navLinksRight } from '../constants';
import { logo } from '../assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="w-[85%] h-[6rem] bg-white fixed top-8 rounded-[30px] flex items-center justify-around text-[20px] font-[200] shadow-sm">
			<ul className="flex justify-center gap-12">
				{navLinksLeft.map((link) => (
					<li key={link.title}>
						<Link to={link.id}>{link.title}</Link>
					</li>
				))}
			</ul>

			<img
				className="absolute rounded-full h-full contrast-100"
				src={logo}
				alt="logo"
			/>

			<span className="flex gap-12 items-center">
				<ul className="flex justify-center gap-12">
					{navLinksRight.map((link) => (
						<li key={link.title}>
							<Link to={link.id}>{link.title}</Link>
						</li>
					))}
				</ul>
				<Link to="shop">
					<button className="bg-button px-8 py-1 rounded-[15px] text-white shadow-sm font-[300] border-none">
						Shop
					</button>
				</Link>
			</span>
		</nav>
	);
};

export default Navbar;
