import { UserContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import { getData, getUserData, updateUserData } from "../../utils/firebase";
import { FavouriteCard } from "../../components";
import { allFavouritesStyle } from "../../styles";

const AllFavourites = () => {
  const { text, userData, setUserData, userLanguage, currentUser } =
    useContext(UserContext);
  const [favourites, setFavourites] = useState([]);

  if (!currentUser) return <Navigate to="/auth" />;

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

  if (favourites.length == 0)
    return (
      <div className={allFavouritesStyle.noFavContainer}>
        <h1 className={allFavouritesStyle.noFavourite}>{text.noFavourite}</h1>
      </div>
    );

  return favourites.map((favourite) => (
    <FavouriteCard favourite={favourite} deleteFavourite={deleteFavourite} />
  ));
};

export default AllFavourites;
