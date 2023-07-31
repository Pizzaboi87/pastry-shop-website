import BlogCategoryCard from "./BlogCategoryCard";
import BlogProposalCard from "./BlogProposalCard";
import { useEffect, useState } from "react";

const BlogStickyCard = ({ posts }) => {
  const [postProposals, setPostProposals] = useState([]);

  useEffect(() => {
    const shuffledPosts = posts.sort(() => 0.5 - Math.random()).slice(0, 3);
    setPostProposals(shuffledPosts);
  }, []);

  return (
    <div className="xl:sticky top-[20%] xl:col-span-2 col-span-6 w-full h-fit flex flex-col">
      <BlogCategoryCard />
      <div className="flex xl:flex-col mb-6 gap-x-4 xl:gap-y-4 xl:mt-4">
        {postProposals.map((post) => (
          <BlogProposalCard key={post.postid} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogStickyCard;
