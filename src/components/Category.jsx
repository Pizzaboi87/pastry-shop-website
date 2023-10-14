import { Icon } from "@iconify/react";

const Category = ({ category }) => {
  return (
    <div className="w-[6.5rem] h-[6.5rem] bg-white flex flex-col items-center justify-center rounded-full hover:bg-[#e45a84] hover:text-white cursor-pointer">
      <Icon icon={category.icon} className="text-[3rem]" />
      <p>{category.title}</p>
    </div>
  );
};

export default Category;
