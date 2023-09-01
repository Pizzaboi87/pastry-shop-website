import { Loading, RecipeCard } from "../../components";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchRecipe } from "../../utils/fetchRecipe";
import { Theme_Icon, favouritePageStyle } from "../../styles";

const FavouritePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const originalName = location.state?.originalName;

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setRecipe(null);
      const firstPunctuationIndex = originalName.search(
        /[.,\/#!$%\^&\*;":{}=\-_`~()]/
      );
      const searchTerm =
        firstPunctuationIndex !== -1
          ? originalName.slice(0, firstPunctuationIndex)
          : originalName;
      const result = await fetchRecipe(searchTerm, 0);
      setRecipe(result[0]);
    };

    if (originalName) fetchData();
  }, [location]);

  return (
    <>
      {recipe && originalName ? (
        <span className={favouritePageStyle.container}>
          <Theme_Icon
            $iconcolor="logo"
            icon="line-md:arrow-left-circle"
            className={favouritePageStyle.icon}
            onClick={() => navigate(-1)}
          />
          <RecipeCard recipe={recipe} isOwnPage={true} />
        </span>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FavouritePage;
