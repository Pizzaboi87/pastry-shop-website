import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { Icon } from "@iconify/react";
import { UserContext } from "../context";
import { Theme_Icon, Theme_Motion_Div } from "../styles";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const RecipeCard = ({ recipe }) => {
  const { text } = useContext(UserContext);
  const motionPropsR = slideIn("right");
  const [liked, setLiked] = useState(false);

  const ingredients = recipe.ingredients.split("|");
  const quoteText = `\u{1F63B} ${recipe.title}\n${ingredients.map(
    (ingredient) => "\n" + ingredient
  )}\n\n${recipe.instructions}\n\n`;

  //-----------------------------------------------------NOT READY: Like/favourite function missing.-----------------------------------------------------
  return (
    <Theme_Motion_Div
      $bgcolor="primary"
      initial={motionPropsR.initial}
      whileInView={motionPropsR.whileInView}
      viewport={motionPropsR.viewport}
      key={recipe.title}
      className="2xl:w-[80%] w-full h-auto mb-20 text-justify p-12 rounded-xl shadow-xl"
    >
      <Theme_Icon
        icon={liked ? "mdi:heart" : "mdi:heart-outline"}
        $iconcolor="logo"
        className="text-[3rem] absolute xl:right-8 right-2 xl:top-10 top-2 cursor-pointer"
        onClick={() => setLiked(!liked)}
      />
      <h1 className="mb-4 xl:text-[1.8rem] text-[1.4rem] text-left font-[500] text-text">
        {recipe.title}
      </h1>
      <h2 className="text-[1.3rem] text-text font-[400]">
        {text.recipeCardTitle}
      </h2>
      <ul className="mb-8 font-[300] text-text text-[1rem]">
        {ingredients.map((ingredient, index) => {
          const [checked, setChecked] = useState(false);

          const toggleChecked = () => {
            setChecked(!checked);
          };

          return (
            <li
              key={`${ingredient}-${index}`}
              className="flex flex-row gap-2 items-center md:mb-0 my-1"
            >
              <span className="w-[2rem] h-[2rem]">
                <Theme_Icon
                  icon={checked ? "mdi:muffin" : "ri:checkbox-blank-line"}
                  $iconcolor="logo"
                  className="text-[2rem] cursor-pointer self-center"
                  onClick={toggleChecked}
                />
              </span>
              <p>{ingredient}</p>
            </li>
          );
        })}
      </ul>
      <p className="text-[1.1rem] font-[400] text-text">
        {recipe.instructions}
      </p>
      <div className="mt-8 flex gap-4">
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
        <EmailShareButton
          title="Le Ciel Sucré"
          body={quoteText}
          url={
            "Find more on our website:\n\u{1F517} https://ciel-sucre.vercel.app"
          }
        >
          <EmailIcon size={36} />
        </EmailShareButton>
      </div>
    </Theme_Motion_Div>
  );
};

export default RecipeCard;
