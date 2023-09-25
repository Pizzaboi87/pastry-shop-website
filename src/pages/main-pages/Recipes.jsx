import { UserContext } from "../../context";
import { useEffect, useState, useContext } from "react";
import { fetchRecipe } from "../../utils/fetchRecipe";
import { translateRecipe } from "../../utils/translateRecipe";
import {
  Loading,
  RecipeCard,
  SearchForm,
  TransitionParent,
} from "../../components";
import {
  Theme_Button,
  Theme_H1,
  Theme_P,
  recipesStyle,
  subTitleStyle,
  titleStyle,
} from "../../styles";
import { getAllRecipes } from "../../utils/firebase";

const Recipes = () => {
  const { text, userLanguage } = useContext(UserContext);
  //const [offset, setOffset] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [noMore, setNoMore] = useState(false);
  //const [searchQuery, setSearchQuery] = useState("dessert");
  //const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      const allRecipes = await getAllRecipes(userLanguage);
      const recipesArray = Object.values(allRecipes);
      setRecipes(recipesArray);
    };

    getRecipes();
  }, [userLanguage]);

  console.log(recipes);

  /*const getRecipes = async () => {
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
  }, [searchQuery, offset]);*/

  return (
    <TransitionParent isFlex>
      <Theme_H1 $textcolor="title" className={titleStyle}>
        {text.recipes.title}
      </Theme_H1>
      {userLanguage !== "eng" && (
        <Theme_P $textcolor="title" className={subTitleStyle}>
          {/*{text.recipes.subTitle}*/}
          This page is under re-construction.
        </Theme_P>
      )}
      {/*<SearchForm
        setLoading={setLoading}
        setNotFound={setNotFound}
        setSearchQuery={setSearchQuery}
        setOffset={setOffset}
      />*/}
      {loading ? (
        <div className={recipesStyle.loadingContainer}>
          <Loading />
        </div>
      ) : notFound ? (
        <h1 className={recipesStyle.text}>{text.recipes.notFound}</h1>
      ) : (
        <>
          {recipes.map((recipe, index) => (
            <RecipeCard
              recipe={recipe}
              isOwnPage={false}
              key={`${recipe.title}-${index}`}
            />
          ))}
          {/*{noMore ? (
            <h1 className={recipesStyle.text}>{text.recipes.noMore}</h1>
          ) : (
            <Theme_Button
              $bgcolor="logo"
              $textcolor="textlight"
              $bordercolor="transparent"
              $hoverbgcolor="dark"
              $hovertextcolor="textlight"
              onClick={showMore}
              className={recipesStyle.button}
            >
              {text.recipes.show}
            </Theme_Button>
          )}*/}
        </>
      )}
    </TransitionParent>
  );
};

export default Recipes;
