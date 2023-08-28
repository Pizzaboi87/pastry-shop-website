import { UserContext } from "../context";
import { useContext } from "react";
import { stamp } from "../assets";
import { Theme_Div, Theme_Stamp, postcardStyle } from "../styles";

const Postcard = () => {
  const { text } = useContext(UserContext);

  return (
    <div className={postcardStyle.wrapper}>
      <Theme_Div
        $bgcolor="transparent"
        $bordercolor="logo"
        className={postcardStyle.messageWrapper}
      >
        <p className={`${postcardStyle.message} ${postcardStyle.messageOne}`}>
          {text.postCard.message.addresse}
        </p>
        <p className={`${postcardStyle.message} ${postcardStyle.messageTwo}`}>
          {text.postCard.message.message}
        </p>
        <p className={`${postcardStyle.message} ${postcardStyle.messageThree}`}>
          {text.postCard.message.senderStart}
          <br />
          {text.postCard.message.senderEnd}
        </p>
        <p className={postcardStyle.message}>{text.postCard.message.ps}</p>
      </Theme_Div>

      <div className={postcardStyle.stampContainer}>
        <Theme_Stamp $bgcolor="logo" className={postcardStyle.stamp}>
          <Theme_Div
            $bgcolor="transparent"
            $bordercolor="logo"
            className={postcardStyle.stampImage}
          />
          <img src={stamp} alt="stamp" className={postcardStyle.stampPicture} />
        </Theme_Stamp>
        <div className={postcardStyle.addressWrapper}>
          <Theme_Div
            $bgcolor="transparent"
            $bordercolor="logo"
            className={postcardStyle.addressContainer}
          >
            <p className={postcardStyle.address}>
              {text.postCard.address.name}
            </p>
          </Theme_Div>
          <Theme_Div
            $bgcolor="transparent"
            $bordercolor="logo"
            className={postcardStyle.addressContainer}
          >
            <p className={postcardStyle.address}>
              {text.postCard.address.street}
            </p>
          </Theme_Div>
          <Theme_Div
            $bgcolor="transparent"
            $bordercolor="logo"
            className={postcardStyle.addressContainer}
          >
            <p className={postcardStyle.address}>
              {text.postCard.address.city}
            </p>
          </Theme_Div>
          <div className={postcardStyle.zipWrapper}>
            {text.postCard.address.zip.map((number, index) => (
              <Theme_Div
                key={index}
                $bgcolor="transparent"
                $bordercolor="logo"
                className={postcardStyle.zipContainer}
              >
                <p className={postcardStyle.zip}>{number}</p>
              </Theme_Div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postcard;
