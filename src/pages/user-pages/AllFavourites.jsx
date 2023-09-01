import { UserContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, updateUserData } from "../../utils/firebase";
import { Theme_Icon, Theme_Span, allFavouritesStyle } from "../../styles";

const AllFavourites = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.likedRecipes) {
      const { likedRecipes } = userData;
      setFavourites(likedRecipes);
    }
  }, [userData]);

  const fetchActualData = async () => {
    const userDatafromDB = await getUserData(userData.uid);
    setUserData(userDatafromDB);
  };

  const deleteFavourite = async (favourite) => {
    const updatedLikedRecipes = userData.likedRecipes.filter(
      (likedRecipe) => likedRecipe !== favourite
    );

    await updateUserData(userData.uid, { likedRecipes: updatedLikedRecipes });
    await fetchActualData();
  };

  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");
  };

  return (
    <>
      {favourites.map((favourite) => (
        <Theme_Span
          key={favourite}
          $bgcolor="light"
          $hoverbgcolor="glasslight"
          className={allFavouritesStyle.container}
          onClick={() =>
            navigate(convertToSlug(favourite), {
              state: { originalName: favourite },
            })
          }
        >
          <Theme_Icon
            icon="mdi:heart"
            $iconcolor="logo"
            className={allFavouritesStyle.icon}
            onClick={() => deleteFavourite(favourite)}
          />
          <h1 className={allFavouritesStyle.title}>{favourite}</h1>
        </Theme_Span>
      ))}
    </>
  );
};

export default AllFavourites;
