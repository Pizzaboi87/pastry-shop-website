import { UserContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import { getData, getUserData, updateUserData } from "../../utils/firebase";
import { FavouriteCard } from "../../components";

const AllFavourites = () => {
  const { userData, setUserData, userLanguage } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);

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

  return favourites.map((favourite) => (
    <FavouriteCard favourite={favourite} deleteFavourite={deleteFavourite} />
  ));
};

export default AllFavourites;
