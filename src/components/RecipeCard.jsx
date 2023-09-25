import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { slideIn } from "../utils/motion";
import { Theme_Button, Theme_Motion_Div, recipeCardStyle } from "../styles";
import { getStoredImage } from "../utils/firebase";

const RecipeCard = ({ recipe, index }) => {
  const { text } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const motionPropsR = slideIn("right", index * 0.25);

  useEffect(() => {
    const getImage = async () => {
      const thumbImage = await getStoredImage(`cakes/thumb/${recipe.id}.webp`);
      setImage(thumbImage);
    };

    if (recipe) getImage();
  }, [recipe]);

  return (
    <Theme_Motion_Div
      $bgcolor="primary"
      $bordercolor="transparent"
      initial={motionPropsR.initial}
      whileInView={motionPropsR.whileInView}
      viewport={motionPropsR.viewport}
      className={recipeCardStyle.wrapper}
    >
      <div className={recipeCardStyle.titleWrapper}>
        <h3 className={recipeCardStyle.title}>{recipe.title}</h3>
        <div className={recipeCardStyle.imageWrapper}>
          <img
            src={image}
            alt={recipe.title}
            className={recipeCardStyle.image}
            onClick={() => navigate(`/recipes/` + recipe.id)}
          />
        </div>
      </div>
      <Theme_Button
        $bgcolor="logo"
        $textcolor="textlight"
        $bordercolor="transparent"
        $hoverbgcolor="dark"
        $hovertextcolor="textlight"
        className={recipeCardStyle.button}
        onClick={() => navigate(`/recipes/` + recipe.id)}
      >
        {text.courseCardButton}
      </Theme_Button>
    </Theme_Motion_Div>
  );
};

export default RecipeCard;
