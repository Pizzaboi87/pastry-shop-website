import { useLocation, useNavigate } from "react-router-dom";
import { Loading, RecipeCard } from "../../components";
import { fetchRecipe } from "../../utils/fetchRecipe";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Theme_Icon } from "../../styles";

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
        <span className="flex gap-x-6">
          <Theme_Icon
            $iconcolor="logo"
            icon="line-md:arrow-left-circle"
            className="text-[4rem] cursor-pointer hover:-translate-y-1 transition-all duration-300 self-start"
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
