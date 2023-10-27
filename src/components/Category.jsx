import { Icon } from "@iconify/react";
import { Theme_Div, shop } from "../styles";

const Category = ({ category, setCategorySelector }) => {
  const handleCategory = () => {
    setCategorySelector(category.select);
  };

  return (
    <div className={shop.categoryIcon} onClick={handleCategory}>
      <Theme_Div
        $bgcolor="logo"
        $bordercolor="transparent"
        className={shop.categoryLayer}
      />
      <div className={shop.categoryDetails}>
        <Icon icon={category.icon} className={shop.categoryPic} />
        <p>{category.title}</p>
      </div>
    </div>
  );
};

export default Category;
