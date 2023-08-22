import React, { useEffect, useState, useContext } from "react";
import { fetchRecipe } from "../../utils/fetchRecipe";
import { UserContext } from "../../context";
import {
  Theme_Button,
  Theme_H1,
  Theme_P,
  subTitleStyle,
  titleStyle,
} from "../../styles";
import { translateRecipe } from "../../utils/translateRecipe";
import {
  Loading,
  RecipeCard,
  SearchForm,
  TransitionParent,
} from "../../components";

const Recipes = () => {
  const { text, userLanguage } = useContext(UserContext);
  const [offset, setOffset] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noMore, setNoMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("dessert");
  const [fetching, setFetching] = useState(false);

  const getRecipes = async () => {
    setNoMore(false);
    setFetching(true);
    try {
      const result = await fetchRecipe(searchQuery, offset);

      if (result.length) {
        const translatedRecipes = await Promise.all(
          result.map(async (recipe) => {
            const translatedInstructions = await translateRecipe(
              recipe.instructions,
              userLanguage.slice(0, -1)
            );
            const translatedIngredients = await translateRecipe(
              recipe.ingredients,
              userLanguage.slice(0, -1)
            );
            return {
              ...recipe,
              instructions: translatedInstructions,
              ingredients: translatedIngredients,
            };
          })
        );

        setRecipes((prevRecipes) => {
          if (offset) {
            return [...prevRecipes, ...translatedRecipes];
          } else {
            return translatedRecipes;
          }
        });
      } else {
        setNoMore(true);
        if (!offset) {
          setNotFound(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const showMore = () => {
    if (!fetching) {
      setOffset(offset + 10);
      getRecipes();
    }
  };

  useEffect(() => {
    getRecipes();
  }, [searchQuery, offset]);

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.recipes.title}
      </Theme_H1>
      {userLanguage !== "eng" && (
        <Theme_P $textcolor="title" className={subTitleStyle}>
          {text.recipes.subTitle}
        </Theme_P>
      )}
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
          {text.recipes.notFound}
        </h1>
      ) : (
        <>
          {recipes.map((recipe, index) => (
            <RecipeCard
              recipe={recipe}
              isOwnPage={false}
              key={`${recipe.title}-${index}`}
            />
          ))}
          {noMore ? (
            <h1 className="text-text py-3 text-[1.3rem]">
              {text.recipes.noMore}
            </h1>
          ) : (
            <Theme_Button
              $bgcolor="logo"
              $textcolor="textlight"
              $bordercolor="transparent"
              $hoverbgcolor="dark"
              $hovertextcolor="textlight"
              onClick={showMore}
              className="px-8 rounded-xl shadow-xl border-none py-3 text-[1.3rem] font-bold"
            >
              {text.recipes.show}
            </Theme_Button>
          )}
        </>
      )}
    </TransitionParent>
  );
};

export default Recipes;
