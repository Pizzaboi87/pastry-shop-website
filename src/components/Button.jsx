import { Link } from 'react-router-dom';

const Button = ({ children, extraClass, whereTo }) => {
	return (
		<button
			className={`${extraClass} bg-button px-8 rounded-[15px] shadow-sm border-none hover:bg-pinkdark text-white`}
		>
			<Link to={whereTo}>{children}</Link>
		</button>
	);
};

export default Button;
