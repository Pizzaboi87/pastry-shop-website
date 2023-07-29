import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context";
import { footerLinks, otherText } from "../constants/";
import { jam } from "../assets/";
import { recolorStyle } from "../styles";

const Footer = () => {
	const { currentUser } = useContext(UserContext);
	const [adminUID, setAdminUID] = useState(false);

	useEffect(() => {
		if (currentUser && currentUser.uid === import.meta.env.VITE_ADMIN_UID)
			setAdminUID(true);
		else setAdminUID(false);
	}, [currentUser]);

	return (
		<footer className="w-full flex flex-col xl:mt-24 mt-8 bg-pinklight text-text">
			<img src={jam} alt="jam" className="h-[7rem]" style={recolorStyle} />
			<div className="flex flex-wrap sm:flex-row flex-col justify-between items-center sm:px-20">
				<div className="flex flex-col items-center justify-center">
					<div
						alt="logo"
						width={118}
						height={18}
						className="bg-logo bg-logoimage w-[6rem] h-[6rem] bg-white bg-center rounded-full"
					/>
					<p className="font-[300] text-[1rem]">
						{otherText.footer.copyRightStart}&copy; <br />{" "}
						{otherText.footer.copyRightEnd}
					</p>
				</div>
				<div className="flex sm:flex-row flex-col sm:pl-0 pl-8 sm:pt-0 pt-8 sm:w-[50%] w-full justify-between">
					{footerLinks.map((link) => (
						<div key={link.title} className="flex flex-col leading-8 pb-8">
							<p className="font-[600] sm:text-[1.2rem] text-[1.5rem] text-logopink">
								{link.title}
							</p>
							<ul>
								{link.links.map((item) => (
									<li
										key={item.title}
										className="font-[300] sm:text-[1rem] text-[1.2rem]"
									>
										<Link to={item.url} className="hover:text-logopink">
											{item.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-end flex-wrap sm:px-16 px-6 py-2 border-t-2 border-dotted border-red">
				<span className="flex gap-4 font-[300] text-[1rem]">
					<Link to="/">{otherText.footer.privacy}</Link>
					<Link to="/">{otherText.footer.terms}</Link>
					{adminUID && <Link to="/admin">{otherText.footer.admin}</Link>}
				</span>
			</div>
		</footer>
	);
};

export default Footer;
