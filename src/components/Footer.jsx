import { UserContext } from "../context";
import { useState, useEffect, useContext } from "react";
import {
  Theme_Div,
  Theme_Footer,
  Theme_Link,
  Theme_P,
  footerStyle,
} from "../styles";

const Footer = () => {
  const { currentUser, text, userTheme } = useContext(UserContext);
  const [jamPic, setJamPic] = useState(null);
  const [adminUID, setAdminUID] = useState(false);

  useEffect(() => {
    const importPic = async () => {
      let picModule;
      switch (userTheme) {
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
  }, [userTheme]);

  const footerUnderLinks = [
    {
      to: "/",
      text: text.footer.privacy,
    },
    {
      to: "/",
      text: text.footer.terms,
    },
    {
      to: adminUID ? "/admin" : null,
      text: adminUID ? text.footer.admin : null,
    },
  ];

  useEffect(() => {
    if (currentUser && currentUser.uid === import.meta.env.VITE_ADMIN_UID)
      setAdminUID(true);
    else setAdminUID(false);
  }, [currentUser]);

  return (
    <Theme_Footer $bgcolor="light" className={footerStyle.wrapper}>
      <img src={jamPic} alt="jam" className={footerStyle.image} />
      <div className={footerStyle.container}>
        <div className={footerStyle.logoContainer}>
          <div
            alt="logo"
            width={118}
            height={18}
            className={footerStyle.logo}
          />
          <p className={footerStyle.copyright}>
            {text.footer.copyRightStart}&copy; <br /> {text.footer.copyRightEnd}
          </p>
        </div>
        <div className={footerStyle.linkContainer}>
          {text.footerLinks.map((link) => (
            <div key={link.title} className={footerStyle.linkList}>
              <Theme_P $textcolor="logo" className={footerStyle.linkTitle}>
                {link.title}
              </Theme_P>
              <ul>
                {link.links.map((item) => (
                  <li key={item.title} className={footerStyle.linkItem}>
                    <Theme_Link
                      to={item.url}
                      $textcolor="text"
                      $bgcolor="transparent"
                      $hovertextcolor="logo"
                    >
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
        $bgcolor="light"
        $bordercolor="logo"
        className={footerStyle.underLinks}
      >
        <span className={footerStyle.underLinkSpan}>
          {footerUnderLinks.map((link) => (
            <Theme_Link
              key={link.text}
              to={link.to}
              $textcolor="text"
              $bgcolor="transparent"
              $hovertextcolor="logo"
              className={footerStyle.underLink}
            >
              {link.text}
            </Theme_Link>
          ))}
        </span>
      </Theme_Div>
    </Theme_Footer>
  );
};

export default Footer;
