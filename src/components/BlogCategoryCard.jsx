import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BlogContext, LanguageContext } from "../context";
import { Theme_Button, Theme_Div } from "../styles";

const BlogCategoryCard = () => {
  const [allBlogPost] = useContext(BlogContext);
  const { text } = useContext(LanguageContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!allBlogPost) return;

    const tagCounts = {};
    allBlogPost.forEach((obj) => {
      const { tags } = obj;

      tags.forEach((tag) => {
        if (tagCounts[tag]) {
          tagCounts[tag]++;
        } else {
          tagCounts[tag] = 1;
        }
      });
    });

    const sortedTags = Object.keys(tagCounts).sort(
      (a, b) => tagCounts[b] - tagCounts[a]
    );
    setCategories(sortedTags);
  }, [allBlogPost]);

  const categoryItems = categories.map((category, index) => (
    <li key={index}>
      <Link to={`/blog/category/${category}`}>
        <Theme_Button
          $bgcolor="logo"
          $textcolor="textlight"
          $bordercolor="transparent"
          $hoverbgcolor="dark"
          $hovertextcolor="textlight"
          className="rounded-xl py-1 px-2 shadow-sm font-[700] text-[1rem] cursor-pointer"
        >
          {category}
        </Theme_Button>
      </Link>
    </li>
  ));

  return (
    <Theme_Div
      $bgcolor="primary"
      $bordercolor="transparent"
      className="rounded-xl xl:mb-0 mb-6 flex flex-col h-fit items-center justify-center shadow-xl px-3 py-3"
    >
      <h1 className="mb-3 text-text text-[1.5rem] font-[600]">
        {text.blogCategoryCardTitle}
      </h1>
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {categoryItems}
      </ul>
    </Theme_Div>
  );
};

export default BlogCategoryCard;
