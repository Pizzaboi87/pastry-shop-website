import { UserContext } from "../../context";
import { Loading } from "../../components";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { slideIn } from "../../utils/motion";
import { Theme_Icon, Theme_Motion_Div, recipeCardStyle } from "../../styles";
import {
  getAllRecipes,
  getStoredImage,
  getUserData,
  updateUserData,
} from "../../utils/firebase";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
} from "react-share";

const RecipePage = () => {
  const { text, userData, setUserData, userLanguage } = useContext(UserContext);
  const { recipeID } = useParams();

  const [recipeImage, setRecipeImage] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [quoteText, setQuoteText] = useState("");

  const motionPropsR = slideIn("right");

  useEffect(() => {
    const getRecipe = async () => {
      const allRecipes = await getAllRecipes(userLanguage);

      const recipesArray = Object.values(allRecipes);
      const selectedRecipe = recipesArray.filter(
        (recipe) => recipe.id === recipeID
      );

      setRecipe(selectedRecipe[0]);

      const quote = `\u{1F63B} ${
        selectedRecipe[0].title
      }\n${selectedRecipe[0].ingredients.map(
        (ingredient) => "\n" + ingredient
      )}\n\n${selectedRecipe[0].method.map((step) => "\n" + step)}\n\n`;

      setQuoteText(quote);
    };

    getRecipe();
  }, [recipeID]);

  useEffect(() => {
    const getImage = async () => {
      const image = await getStoredImage(`cakes/original/${recipe.id}.webp`);
      setRecipeImage(image);
    };

    if (recipe) getImage();
  }, [recipeID, recipe]);

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
    const subject = text.recipeCardEmail;
    const body = `${quoteText} ${text.recipeFooter}\n\u{1F517} https://ciel-sucre.vercel.app`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  };

  if (!recipe) return <Loading />;

  return (
    <Theme_Motion_Div
      $bgcolor="primary"
      $bordercolor="logo"
      initial={motionPropsR.initial}
      whileInView={motionPropsR.whileInView}
      viewport={motionPropsR.viewport}
      key={recipe.title}
      className={recipeCardStyle.wrapper}
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
            const isChecked = checkedItems[index] || false;

            const toggleChecked = () => {
              setCheckedItems((prevState) => ({
                ...prevState,
                [index]: !isChecked,
              }));
            };

            return (
              <li
                key={`${ingredient}-${index}`}
                className={recipeCardStyle.listItem}
              >
                <span className={recipeCardStyle.span}>
                  <Theme_Icon
                    icon={isChecked ? "mdi:muffin" : "ri:checkbox-blank-line"}
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

export default RecipePage;
