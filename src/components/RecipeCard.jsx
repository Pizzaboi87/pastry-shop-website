import { UserContext } from "../context";
import { useContext, useEffect, useState } from "react";
import { slideIn } from "../utils/motion";
import { getStoredImage, getUserData, updateUserData } from "../utils/firebase";
import { Theme_Icon, Theme_Motion_Div, recipeCardStyle } from "../styles";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
} from "react-share";

const RecipeCard = ({ recipe, isOwnPage }) => {
  const { text, userData, setUserData } = useContext(UserContext);
  const motionPropsR = slideIn("right");
  const [liked, setLiked] = useState(false);
  const [recipeImage, setRecipeImage] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      const image = await getStoredImage(`cakes/original/${recipe.id}.webp`);
      setRecipeImage(image);
    };

    getImage();
  }, [recipe]);

  const quoteText = `\u{1F63B} ${recipe.title}\n${recipe.ingredients.map(
    (ingredient) => "\n" + ingredient
  )}\n\n${recipe.method.map((step) => "\n" + step)}\n\n`;

  const fetchActualData = async () => {
    const userDatafromDB = await getUserData(userData.uid);
    setUserData(userDatafromDB);
  };

  useEffect(() => {
    if (userData && userData.likedRecipes) {
      const { likedRecipes } = userData;
      setLiked(likedRecipes.includes(recipe.title));
    }
  }, [userData]);

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);

    const updatedLikedRecipes = newLiked
      ? [...userData.likedRecipes, recipe.title]
      : userData.likedRecipes.filter(
          (likedRecipe) => likedRecipe !== recipe.title
        );

    await updateUserData(userData.uid, { likedRecipes: updatedLikedRecipes });
    await fetchActualData();
  };

  const sendMail = (email) => {
    const subject = text.recipeEmail;
    const body = `${quoteText} ${text.recipeFooter}\n\u{1F517} https://ciel-sucre.vercel.app`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  };

  return (
    <Theme_Motion_Div
      $bgcolor="primary"
      initial={motionPropsR.initial}
      whileInView={motionPropsR.whileInView}
      viewport={motionPropsR.viewport}
      key={recipe.title}
      className={`${isOwnPage ? "" : recipeCardStyle.notOwn} ${
        recipeCardStyle.wrapper
      }`}
    >
      <Theme_Icon
        icon={liked ? "mdi:heart" : "mdi:heart-outline"}
        $iconcolor="logo"
        className={recipeCardStyle.likeIcon}
        onClick={handleLike}
      />
      <h1 className={recipeCardStyle.title}>{recipe.title}</h1>
      <div className={recipeCardStyle.ingredientsWrapper}>
        <ul className={recipeCardStyle.list}>
          <h2 className={recipeCardStyle.cardTitle}>{text.recipeCardTitle}</h2>
          {recipe.ingredients.map((ingredient, index) => {
            const [checked, setChecked] = useState(false);

            const toggleChecked = () => {
              setChecked(!checked);
            };

            return (
              <li
                key={`${ingredient}-${index}`}
                className={recipeCardStyle.listItem}
              >
                <span className={recipeCardStyle.span}>
                  <Theme_Icon
                    icon={checked ? "mdi:muffin" : "ri:checkbox-blank-line"}
                    $iconcolor="logo"
                    className={recipeCardStyle.ingredientsIcon}
                    onClick={toggleChecked}
                  />
                </span>
                <p>{ingredient}</p>
              </li>
            );
          })}
        </ul>
        <div className={recipeCardStyle.imageWrapper}>
          <img
            src={recipeImage}
            alt={recipe.title}
            className={recipeCardStyle.image}
          />
        </div>
      </div>
      {recipe.method.map((step, index) => (
        <p key={index} className={recipeCardStyle.instructions}>
          {index + 1} - {step}
        </p>
      ))}
      <div className={recipeCardStyle.socialWrapper}>
        <FacebookShareButton
          url={"https://ciel-sucre.vercel.app"}
          quote={quoteText}
          hashtag={"#frenchcake"}
        >
          <FacebookIcon size={36} />
        </FacebookShareButton>
        <TwitterShareButton
          title={quoteText}
          url={"https://ciel-sucre.vercel.app"}
          hashtag={"#frenchcake"}
        >
          <TwitterIcon size={36} />
        </TwitterShareButton>
        <EmailIcon
          size={36}
          onClick={sendMail}
          className={recipeCardStyle.email}
        />
      </div>
    </Theme_Motion_Div>
  );
};

export default RecipeCard;
