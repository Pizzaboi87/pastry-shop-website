import { Link } from "react-router-dom";
import { footerLinks } from "../constants/";
import { jam } from "../assets/";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col mt-24 bg-pinklight text-text">
      <img src={jam} alt="jam" className="bg-contain w-full h-[6.4rem]" />
      <div className="flex flex-wrap justify-between items-center px-20">
        <div className="flex flex-col items-center justify-center">
          <div
            alt="logo"
            width={118}
            height={18}
            className="bg-logo bg-logoimage w-[6rem] h-[6rem] bg-white bg-center rounded-full"
          />
          <p className="font-[300] text-[1rem]">
            2023 Le Ciel Sucré&copy; <br /> All rights reserved.
          </p>
        </div>
        <div className="flex w-[50%] justify-between">
          {footerLinks.map((link) => (
            <div key={link.title} className="flex flex-col leading-8">
              <p className="font-[600] text-[1.2rem] text-logopink">
                {link.title}
              </p>
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
      <div className="flex justify-end flex-wrap sm:px-16 px-6 py-2 border-t-2 border-dotted border-red">
        <span className="flex gap-4 font-[300] text-[1rem]">
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Terms of Use</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
