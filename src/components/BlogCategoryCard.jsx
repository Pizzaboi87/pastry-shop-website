import { Link } from "react-router-dom";

const BlogCategoryCard = ({ categories }) => {
  const categoryItems = categories.map((category, index) => (
    <li key={index}>
      <Link to={`/blog/category/${category}`}>
        <button className="bg-logopink text-white rounded-xl py-1 px-2 shadow-sm font-[700] text-[1rem] cursor-pointer">
          {category}
        </button>
      </Link>
    </li>
  ));

  return (
    <div className="rounded-xl xl:mb-0 mb-6 flex flex-col h-fit bg-primary items-center justify-center shadow-xl px-3 py-3">
      <h1 className="mb-3 text-text text-[1.5rem] font-[600]">Popular tags</h1>
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {categoryItems}
      </ul>
    </div>
  );
};

export default BlogCategoryCard;
