import { createContext, useState, useEffect } from "react";
import { getStoredImage, getAllPost } from "../utils/firebase";
import { Loading } from "../components";

export const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [allBlogPost, setAllBlogPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firebaseData = await getAllPost();

        const processedData = await Promise.all(
          Object.keys(firebaseData).map(async (postid) => {
            const element = firebaseData[postid];
            const imageUrl = await getStoredImage(element.image);
            return { ...element, postid, image: imageUrl };
          })
        );

        setAllBlogPost(processedData);
      } catch (error) {
        console.error("An error happened during data fetching.", error);
      }
    };

    fetchData();
  }, []);

  if (allBlogPost.length === 0) return <Loading />;

  const value = [allBlogPost, setAllBlogPost];

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
