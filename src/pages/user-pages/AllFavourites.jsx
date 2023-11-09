import { UserContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, getUserData, updateUserData } from "../../utils/firebase";
import { Theme_Icon, Theme_Span, allFavouritesStyle } from "../../styles";

const AllFavourites = () => {
  const { userData, setUserData, userLanguage } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFavourites = async () => {
      if (userData && userData.likedRecipes) {
        const { likedRecipes } = userData;
        const allRecipes = await getData(`recipes/${userLanguage}`);
        const recipesArray = Object.values(allRecipes);
        const likedRecipesArray = recipesArray
          .filter((recipe) => likedRecipes.includes(recipe.id))
          .map((recipe) => [recipe.title, recipe.id]);

        setFavourites(likedRecipesArray);
      }
    };

    getFavourites();
  }, [userData]);

  const fetchActualData = async () => {
    const userDatafromDB = await getUserData(userData.uid);
    setUserData(userDatafromDB);
  };

  const deleteFavourite = async (favourite) => {
    const updatedLikedRecipes = userData.likedRecipes.filter(
      (likedRecipe) => likedRecipe !== favourite[1]
    );

    await updateUserData(userData.uid, { likedRecipes: updatedLikedRecipes });
    await fetchActualData();
  };

  return (
    <>
      {favourites.map((favourite) => (
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
        </Theme_Span>
      ))}
    </>
  );
};

export default AllFavourites;
