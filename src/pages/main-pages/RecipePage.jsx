import { UserContext } from "../../context";
import { Loading } from "../../components";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { slideIn } from "../../utils/motion";
import { Theme_Icon, Theme_Motion_Div, recipePageStyle } from "../../styles";
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
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    if (userData && userData.likedRecipes && recipe) {
      const { likedRecipes } = userData;
      setLiked(likedRecipes.includes(recipe.id));
    }
  }, [userData, recipe]);

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);

    const updatedLikedRecipes = newLiked
      ? [...userData.likedRecipes, recipe.id]
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
      className={`${recipePageStyle.wrapper} ${
        pathname.includes("recipes") ? "2xl:w-[80%]" : ""
      }`}
    >
      <div className={recipePageStyle.iconContainer}>
        <Theme_Icon
          $iconcolor="logo"
          icon="line-md:arrow-left-circle"
          className={recipePageStyle.icon}
          onClick={() => navigate(-1)}
        />
        <Theme_Icon
          icon={liked ? "mdi:heart" : "mdi:heart-outline"}
          $iconcolor="logo"
          className={recipePageStyle.likeIcon}
          onClick={handleLike}
        />
      </div>
      <h1 className={recipePageStyle.title}>{recipe.title}</h1>
      <div className={recipePageStyle.ingredientsWrapper}>
        <ul className={recipePageStyle.list}>
          <h2 className={recipePageStyle.cardTitle}>{text.recipeCardTitle}</h2>
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
                className={recipePageStyle.listItem}
              >
                <span className={recipePageStyle.span}>
                  <Theme_Icon
                    icon={isChecked ? "mdi:muffin" : "ri:checkbox-blank-line"}
                    $iconcolor="logo"
                    className={recipePageStyle.ingredientsIcon}
                    onClick={toggleChecked}
                  />
                </span>
                <p>{ingredient}</p>
              </li>
            );
          })}
        </ul>
        <div className={recipePageStyle.imageWrapper}>
          <img
            src={recipeImage}
            alt={recipe.title}
            className={recipePageStyle.image}
          />
        </div>
      </div>
      {recipe.method.map((step, index) => (
        <p key={index} className={recipePageStyle.instructions}>
          {index + 1} - {step}
        </p>
      ))}
      <div className={recipePageStyle.socialWrapper}>
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
          className={recipePageStyle.email}
        />
      </div>
    </Theme_Motion_Div>
  );
};

export default RecipePage;
