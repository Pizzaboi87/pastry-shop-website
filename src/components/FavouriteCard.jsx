import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredImage } from "../utils/firebase";
import { Theme_Icon, Theme_Span, allFavouritesStyle } from "../styles";

const FavouriteCard = ({ favourite }) => {
  const [image, setImage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getImage = async () => {
      const thumbImage = await getStoredImage(
        `cakes/thumb/${favourite[1]}.webp`
      );
      setImage(thumbImage);
    };

    getImage();
  }, []);

  return (
    <Theme_Span
      key={favourite}
      $bgcolor="light"
      $hoverbgcolor="glasslight"
      className={allFavouritesStyle.container}
      onClick={(event) => {
        event.stopPropagation();
        navigate(favourite[1]);
      }}
    >
      <span className={allFavouritesStyle.span}>
        <Theme_Icon
          icon="mdi:heart"
          $iconcolor="logo"
          className={allFavouritesStyle.icon}
          onClick={(event) => {
            event.stopPropagation();
            deleteFavourite(favourite);
          }}
        />
        <h1 className={allFavouritesStyle.title}>{favourite[0]}</h1>
      </span>
      <img src={image} className={allFavouritesStyle.image} alt="cake_image" />
    </Theme_Span>
  );
};

export default FavouriteCard;
