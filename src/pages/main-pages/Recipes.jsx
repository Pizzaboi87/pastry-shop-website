import ReactPaginate from "react-paginate";
import { UserContext } from "../../context";
import { RecipeCard, TransitionParent } from "../../components";
import { useEffect, useState, useContext } from "react";
import { getData } from "../../utils/firebase";
import {
  Theme_H1,
  Theme_P,
  recipesStyle,
  subTitleStyle,
  titleStyle,
} from "../../styles";

const Recipes = () => {
  const { text, userLanguage } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 9;
  const currentItems = recipes.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(recipes.length / 9);

  useEffect(() => {
    const getRecipes = async () => {
      const allRecipes = await getData(`recipes/${userLanguage}`);
      const recipesArray = Object.values(allRecipes);
      setRecipes(recipesArray);
    };

    getRecipes();
  }, [userLanguage]);

  const Cards = ({ currentItems }) => {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => (
            <RecipeCard recipe={item} index={index - 5} key={item.id} />
          ))}
      </>
    );
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 9) % recipes.length;
    setItemOffset(newOffset);
  };

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
      <div className={recipesStyle.cardContainer}>
        <Cards currentItems={currentItems} />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={text.pagination.next}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={text.pagination.previous}
        renderOnZeroPageCount={null}
        className={recipesStyle.pagination}
        activeClassName={recipesStyle.activePage}
      />
    </TransitionParent>
  );
};

export default Recipes;
