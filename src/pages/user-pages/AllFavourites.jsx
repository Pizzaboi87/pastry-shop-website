import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { Theme_Icon, Theme_Span } from "../../styles";
import { getUserData, updateUserData } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

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
          className="flex items-center min-w-[75%] md:w-auto w-full md:h-[3rem] h-[3.5rem] rounded-xl shadow-xl p-2 cursor-pointer gap-x-4 hover:-translate-y-1 transition-all duration-500 border border-text"
          onClick={() =>
            navigate(convertToSlug(favourite), {
              state: { originalName: favourite },
            })
          }
        >
          <Theme_Icon
            icon="mdi:heart"
            $iconcolor="logo"
            className="text-[2.2rem] cursor-pointer"
            onClick={() => deleteFavourite(favourite)}
          />
          <h1 className="text-text md:text-[1.2rem] md:w-auto w-[75%] text-[1rem] text-center font-[600]">
            {favourite}
          </h1>
        </Theme_Span>
      ))}
    </>
  );
};

export default AllFavourites;
