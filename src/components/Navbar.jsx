import { navLinksLeft, navLinksRight } from '../constants';
import { logo } from '../assets';
import { Link } from 'react-router-dom';
import { Button } from '.';

const Navbar = () => {
	return (
		<nav className="w-[85%] h-[6rem] bg-white fixed top-8 rounded-[30px] flex items-center justify-around text-[20px] font-[200] shadow-sm z-10">
			<ul className="flex justify-center gap-12">
				{navLinksLeft.map((link) => (
					<li key={link.title} className="text-text hover:text-logopink">
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
						<li key={link.title} className="text-text hover:text-logopink">
							<Link to={link.id}>{link.title}</Link>
						</li>
					))}
				</ul>
				<span>
					<Link to="signup" className="text-text hover:text-logopink">
						Register
					</Link>{' '}
					/{' '}
					<Button extraClass="font-[300] py-1" whereTo="/login">
						Login
					</Button>
				</span>
			</span>
		</nav>
	);
};

export default Navbar;
