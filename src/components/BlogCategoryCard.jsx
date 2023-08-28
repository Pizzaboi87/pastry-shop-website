import { BlogContext, UserContext } from "../context";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Theme_Button, Theme_Div, blogCategoryCardStyle } from "../styles";

const BlogCategoryCard = () => {
  const { allBlogPost } = useContext(BlogContext);
  const { text } = useContext(UserContext);
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

  return (
    <Theme_Div
      $bgcolor="primary"
      $bordercolor="transparent"
      className={blogCategoryCardStyle.wrapper}
    >
      <h1 className={blogCategoryCardStyle.title}>
        {text.blogCategoryCardTitle}
      </h1>
      <ul className={blogCategoryCardStyle.list}>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/blog/category/${category}`}>
              <Theme_Button
                $bgcolor="logo"
                $textcolor="textlight"
                $bordercolor="transparent"
                $hoverbgcolor="dark"
                $hovertextcolor="textlight"
                className={blogCategoryCardStyle.button}
              >
                {category}
              </Theme_Button>
            </Link>
          </li>
        ))}
      </ul>
    </Theme_Div>
  );
};

export default BlogCategoryCard;
