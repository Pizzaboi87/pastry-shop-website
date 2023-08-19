import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { TransitionParent, UserPanel } from "../../components";
import { Theme_H1, Theme_Icon, userPageStyle } from "../../styles";
import { getUserData, updateUserData } from "../../utils/firebase";
import { Theme_Span } from "../../styles/styled-elements";

const Favourites = () => {
  const { text, userData, setUserData } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);

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

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.favouritesTitle}
      </Theme_H1>

      <UserPanel>
        <div className="min-h-[30rem] w-full flex flex-col gap-y-6 items-center">
          {favourites.map((favourite) => (
            <Theme_Span
              key={favourite}
              $bgcolor="light"
              $hoverbgcolor="glasslight"
              className="flex items-center min-w-[75%] h-[3rem] rounded-xl shadow-xl p-2 cursor-pointer gap-x-2 hover:-translate-y-1 transition-all duration-500 border border-text"
            >
              <Theme_Icon
                icon="mdi:heart"
                $iconcolor="logo"
                className="text-[2.2rem] cursor-pointer"
                onClick={() => deleteFavourite(favourite)}
              />
              <h1 className="text-text text-[1.2rem] font-[600]">
                {favourite}
              </h1>
            </Theme_Span>
          ))}
        </div>
      </UserPanel>
    </TransitionParent>
  );
};

export default Favourites;
