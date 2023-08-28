import BlogCategoryCard from "./BlogCategoryCard";
import BlogProposalCard from "./BlogProposalCard";
import { useEffect, useState } from "react";
import { blogStickyStyle } from "../styles";

const BlogStickyCard = ({ posts }) => {
  const [postProposals, setPostProposals] = useState([]);

  useEffect(() => {
    const shuffledPosts = posts.sort(() => 0.5 - Math.random()).slice(0, 3);
    setPostProposals(shuffledPosts);
  }, []);

  return (
    <div className={blogStickyStyle.wrapper}>
      <BlogCategoryCard />
      <div className={blogStickyStyle.container}>
        {postProposals.map((post) => (
          <BlogProposalCard key={post.postid} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogStickyCard;
