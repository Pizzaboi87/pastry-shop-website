import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, UserContext } from "../context";
import { footerLinks, otherText } from "../constants/";
import { Theme_Div, Theme_Footer, Theme_Link, Theme_P } from "../styles";

const Footer = () => {
  const { currentUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [jamPic, setJamPic] = useState(null);
  const [adminUID, setAdminUID] = useState(false);

  useEffect(() => {
    const importPic = async () => {
      let picModule;
      switch (theme) {
        case "blue":
          picModule = await import("../assets/jam-blue.webp");
          break;
        case "green":
          picModule = await import("../assets/jam-green.webp");
          break;
        case "brown":
          picModule = await import("../assets/jam-brown.webp");
          break;
        default:
          picModule = await import("../assets/jam-pink.webp");
          break;
      }
      setJamPic(picModule.default);
    };

    importPic();
  }, [theme]);

  useEffect(() => {
    if (currentUser && currentUser.uid === import.meta.env.VITE_ADMIN_UID)
      setAdminUID(true);
    else setAdminUID(false);
  }, [currentUser]);

  return (
    <Theme_Footer
      $bgcolor="light"
      className="w-full flex flex-col xl:mt-24 mt-8 text-text"
    >
      <img src={jamPic} alt="jam" className="h-[7rem]" />
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
              <Theme_P
                $textcolor="logo"
                className="font-[600] sm:text-[1.2rem] text-[1.5rem]"
              >
                {link.title}
              </Theme_P>
              <ul>
                {link.links.map((item) => (
                  <li
                    key={item.title}
                    className="font-[300] sm:text-[1rem] text-[1.2rem]"
                  >
                    <Theme_Link to={item.url} $hovertextcolor="logo">
                      {item.title}
                    </Theme_Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Theme_Div
        $bordercolor="logo"
        className="flex justify-end flex-wrap sm:px-16 px-6 py-2 border-t-2 border-dotted"
      >
        <span className="flex gap-4 font-[300] text-[1rem]">
          <Link to="/">{otherText.footer.privacy}</Link>
          <Link to="/">{otherText.footer.terms}</Link>
          {adminUID && <Link to="/admin">{otherText.footer.admin}</Link>}
        </span>
      </Theme_Div>
    </Theme_Footer>
  );
};

export default Footer;
