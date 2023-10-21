import { Icon } from "@iconify/react";
import { Theme_Div } from "../styles";

const Category = ({ category, setCategorySelector }) => {
  const handleCategory = () => {
    setCategorySelector(category.select);
  };

  return (
    <div
      className="w-[6.5rem] h-[6.5rem] bg-white flex items-center justify-center rounded-full cursor-pointer relative container overflow-hidden"
      onClick={handleCategory}
    >
      <Theme_Div
        $bgcolor="logo"
        $bordercolor="transparent"
        className="layer w-full h-full absolute z-[0] rounded-full"
      />
      <div className="absolute z-1 flex-col flex items-center justify-center">
        <Icon icon={category.icon} className="text-[3rem]" />
        <p>{category.title}</p>
      </div>
    </div>
  );
};

export default Category;
