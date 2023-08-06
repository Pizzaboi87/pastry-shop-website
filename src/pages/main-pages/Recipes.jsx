import { useEffect, useState } from "react";
import { fetchRecipe } from "../../utils/fetchRecipe";
import { otherText } from "../../constants";
import { Theme_Button, Theme_H1, titleStyle } from "../../styles";
import {
  Loading,
  RecipeCard,
  SearchForm,
  TransitionParent,
} from "../../components";

const Recipes = () => {
  const [offset, setOffset] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noMore, setNoMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("dessert");

  const getRecipes = async () => {
    setNoMore(false);
    const result = await fetchRecipe(searchQuery, offset);
    setLoading(false);

    if (result.length) {
      setRecipes((prevRecipes) => {
        if (offset) {
          return [...prevRecipes, ...result];
        } else {
          return result;
        }
      });
    } else {
      setNoMore(true);
      if (!offset) {
        setNotFound(true);
      }
    }
  };

  const showMore = () => {
    setOffset(offset + 10);
  };

  useEffect(() => {
    getRecipes();
  }, [searchQuery, offset]);

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {otherText.recipes.title}
      </Theme_H1>
      <SearchForm
        setLoading={setLoading}
        setNotFound={setNotFound}
        setSearchQuery={setSearchQuery}
        setOffset={setOffset}
      />
      {loading ? (
        <div className="mt-[-5rem]">
          <Loading />
        </div>
      ) : notFound ? (
        <h1 className="text-text py-3 text-[1.3rem]">
          {otherText.recipes.notFound}
        </h1>
      ) : (
        <>
          {recipes.map((recipe, index) => (
            <RecipeCard recipe={recipe} key={`${recipe.title}-${index}`} />
          ))}
          {noMore ? (
            <h1 className="text-text py-3 text-[1.3rem]">
              {otherText.recipes.noMore}
            </h1>
          ) : (
            <Theme_Button
              $bgcolor="logo"
              $hoverbgcolor="dark"
              $textcolor="textlight"
              onClick={showMore}
              className="px-8 rounded-xl shadow-xl border-none py-3 text-[1.3rem] font-bold"
            >
              {otherText.recipes.show}
            </Theme_Button>
          )}
        </>
      )}
    </TransitionParent>
  );
};

export default Recipes;
